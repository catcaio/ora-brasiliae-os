#!/usr/bin/env python3
"""
generate_context_package.py
---------------------------

Gera um pacote de contexto mínimo a partir de uma issue do GitHub.

Objetivo:
- Evitar transportar conversas inteiras entre IAs.
- Transformar a issue canônica em um resumo curto e reutilizável.
- Alimentar agentes, Slack, Linear ou ClickUp com estado, não ruído.

Uso com GitHub CLI:
    gh issue view 11 --json number,title,body,url,labels,state \
      | python3 scripts/generate_context_package.py
"""

from __future__ import annotations

import json
import re
import sys
from typing import Any, Dict, Iterable, List


MAX_BODY_LINES = 12
MAX_CHARS = 1800


def clean_lines(text: str) -> List[str]:
    return [line.strip() for line in text.splitlines() if line.strip()]


def extract_checklist(lines: Iterable[str]) -> List[str]:
    checklist = []
    for line in lines:
        if re.match(r"^- \[[ xX]\] ", line):
            checklist.append(line)
    return checklist


def label_names(issue: Dict[str, Any]) -> List[str]:
    labels = issue.get("labels", []) or []
    names = []
    for label in labels:
        if isinstance(label, str):
            names.append(label)
        elif isinstance(label, dict) and label.get("name"):
            names.append(label["name"])
    return names


def generate_summary(issue: Dict[str, Any]) -> str:
    number = issue.get("number") or issue.get("issue_number") or "?"
    title = issue.get("title", "Untitled")
    state = issue.get("state", "unknown")
    url = issue.get("url") or issue.get("html_url") or ""
    body = issue.get("body", "") or ""
    lines = clean_lines(body)
    excerpt = "\n".join(lines[:MAX_BODY_LINES])
    checklist = extract_checklist(lines)
    labels = ", ".join(label_names(issue)) or "none"

    parts = [
        f"Issue: #{number} - {title}",
        f"Estado: {state}",
        f"Labels: {labels}",
    ]
    if url:
        parts.append(f"URL: {url}")
    if excerpt:
        parts.append("\nContexto essencial:\n" + excerpt)
    if checklist:
        parts.append("\nChecklist detectado:\n" + "\n".join(checklist[:8]))

    summary = "\n".join(parts)
    if len(summary) > MAX_CHARS:
        summary = summary[: MAX_CHARS - 20].rstrip() + "\n...[truncated]"
    return summary


def main() -> None:
    issue_json = json.load(sys.stdin)
    print(generate_summary(issue_json))


if __name__ == "__main__":
    main()
