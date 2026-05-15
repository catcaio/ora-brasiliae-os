#!/usr/bin/env python3
"""
notion_to_issue.py
------------------

Promove páginas aprovadas do Notion para issues no GitHub.

Premissas de governança:
- Notion é captura bruta.
- GitHub é o ledger canônico.
- Apenas páginas com Status = APPROVED viram issues.
- A sincronização cria rastreabilidade, não sobrescreve decisões versionadas.

Variáveis de ambiente:
- NOTION_API_TOKEN
- NOTION_DATABASE_ID
- GITHUB_TOKEN
- GITHUB_REPO, por exemplo: catcaio/ora-brasiliae-os

Uso:
    python3 scripts/notion_to_issue.py
"""

from __future__ import annotations

import os
import sys
from typing import Any, Dict, List, Optional

import requests


NOTION_VERSION = "2022-06-28"


def require_env(name: str) -> str:
    value = os.environ.get(name)
    if not value:
        raise RuntimeError(f"Environment variable missing: {name}")
    return value


def notion_headers() -> Dict[str, str]:
    return {
        "Authorization": f"Bearer {require_env('NOTION_API_TOKEN')}",
        "Notion-Version": NOTION_VERSION,
        "Content-Type": "application/json",
    }


def github_headers() -> Dict[str, str]:
    return {
        "Authorization": f"Bearer {require_env('GITHUB_TOKEN')}",
        "Accept": "application/vnd.github+json",
    }


def fetch_approved_pages() -> List[Dict[str, Any]]:
    """Query the Notion database for pages with Status == APPROVED."""
    database_id = require_env("NOTION_DATABASE_ID")
    url = f"https://api.notion.com/v1/databases/{database_id}/query"
    payload = {
        "filter": {
            "property": "Status",
            "select": {"equals": "APPROVED"},
        }
    }
    response = requests.post(url, headers=notion_headers(), json=payload, timeout=30)
    response.raise_for_status()
    return response.json().get("results", [])


def first_title_property(properties: Dict[str, Any]) -> str:
    for prop in properties.values():
        if prop.get("type") == "title":
            title_items = prop.get("title", [])
            if title_items:
                return title_items[0].get("plain_text", "Untitled")
    return "Untitled"


def rich_text_value(prop: Optional[Dict[str, Any]]) -> str:
    if not prop or prop.get("type") != "rich_text":
        return ""
    return "\n".join(item.get("plain_text", "") for item in prop.get("rich_text", []))


def select_value(prop: Optional[Dict[str, Any]]) -> Optional[str]:
    if not prop or prop.get("type") != "select" or not prop.get("select"):
        return None
    return prop["select"].get("name")


def extract_issue_fields(page: Dict[str, Any]) -> Dict[str, Any]:
    """Extract title, body and labels from a Notion page payload."""
    props = page.get("properties", {})
    title = first_title_property(props)
    description = rich_text_value(props.get("Description"))
    issue_type = select_value(props.get("Type"))
    notion_url = page.get("url", "")

    body_parts = []
    if description:
        body_parts.append(description)
    body_parts.append(f"## Origem\n[Notion Page]({notion_url})")
    body_parts.append("## Estado inicial\nPromovido automaticamente de Notion APPROVED para GitHub Issue.")

    labels = [issue_type] if issue_type else ["from-notion"]
    return {"title": title, "body": "\n\n".join(body_parts), "labels": labels}


def create_github_issue(issue: Dict[str, Any]) -> Dict[str, Any]:
    repo = require_env("GITHUB_REPO")
    url = f"https://api.github.com/repos/{repo}/issues"
    payload: Dict[str, Any] = {
        "title": issue["title"],
        "body": issue["body"],
        "labels": issue.get("labels", []),
    }
    response = requests.post(url, headers=github_headers(), json=payload, timeout=30)
    response.raise_for_status()
    return response.json()


def main() -> None:
    pages = fetch_approved_pages()
    if not pages:
        print("No APPROVED Notion pages found.")
        return

    for page in pages:
        issue_fields = extract_issue_fields(page)
        created = create_github_issue(issue_fields)
        print(f"Created issue #{created.get('number')}: {created.get('html_url')}")


if __name__ == "__main__":
    try:
        main()
    except Exception as exc:
        print(f"Error: {exc}", file=sys.stderr)
        sys.exit(1)
