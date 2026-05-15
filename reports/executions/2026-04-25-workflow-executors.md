# Execution Report: Workflow Executors

## Origem
GitHub Issue #11: Implementar executores mínimos do workflow OS.

## Status
REVIEW

## Objetivo
Implementar executores mínimos para reduzir o transporte manual de contexto entre IAs e ferramentas, preservando GitHub como ledger canônico e Notion como captura bruta.

## Escopo executado

- Criada branch `feat/11-workflow-executors`.
- Criado script `scripts/notion_to_issue.py` para promover páginas aprovadas do Notion em issues GitHub.
- Criado script `scripts/generate_context_package.py` para gerar pacote mínimo de contexto a partir de issue GitHub.
- Criada política `docs/governance/branch-naming.md` para padronização de branches.
- Criado workflow `.github/workflows/validate-pr.yml` para validar se PRs têm seções obrigatórias.
- Criado workflow `.github/workflows/report-to-notion.yml` para reportar PRs mergeados ao Notion.
- Criada política `docs/governance/integration-routing.md` incorporando Notion, GitHub, Linear, ClickUp e Slack ao fluxo.

## Validação

Validação estrutural por inspeção dos arquivos criados e alinhamento com a regra central do repositório: GitHub como ledger canônico, Notion como captura bruta e PR obrigatório.

## Evidências

- Branch: `feat/11-workflow-executors`.
- Issue: #11.
- PR esperado: abrir contra `governance/bootstrap`.

## Riscos

- Os workflows dependem de secrets do repositório: `NOTION_API_TOKEN` e `NOTION_PARENT_PAGE_ID`.
- O script `notion_to_issue.py` depende de schema mínimo no Notion: propriedades `Status`, opcionalmente `Description` e `Type`.
- A sincronização automática pode duplicar issues se não houver campo externo de controle de páginas já promovidas.
- Linear, ClickUp e Slack foram documentados como nós auxiliares, mas integrações automáticas completas ainda precisam de rotas específicas por caso de uso.

## Próximo passo recomendado

Revisar o PR, configurar secrets no GitHub e definir se haverá campo no Notion para registrar `GitHub Issue URL` após promoção.
