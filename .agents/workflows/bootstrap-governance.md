# bootstrap-governance

## objetivo
Criar estrutura base de governança do repositório e estabelecer sistema versionado de operação.

## regras
- não usar main
- não instalar dependências
- apenas estrutura e governança

## passos

1. criar diretórios:

docs/
docs/adr/
docs/governance/

prompts/
prompts/agents/

policies/
evals/

reports/
reports/executions/
reports/audits/

notebooks/

research/
research/core/
research/gaps/
research/evidence/
research/incidents/

product/
product/prds/
product/research/
product/decisions/

2. criar arquivos:

docs/governance/operating-rules.md
docs/governance/state-machine.md
docs/governance/notion-github-sync-policy.md
docs/governance/tool-roles.md

.github/PULL_REQUEST_TEMPLATE.md
.github/ISSUE_TEMPLATE/feature.md
.github/ISSUE_TEMPLATE/bug.md

docs/adr/ADR_TEMPLATE.md

reports/executions/EXECUTION_REPORT_TEMPLATE.md
reports/audits/AUDIT_REPORT_TEMPLATE.md

3. preencher conteúdo:

### operating-rules.md

# Operating Rules

1. GitHub é fonte canônica
2. Notion é captura bruta
3. Nada importante entra sem PR
4. Notion nunca sobrescreve GitHub
5. Antigravity nunca trabalha direto na main
6. Toda decisão relevante vira artefato versionado
7. Toda execução relevante gera relatório
8. Perplexity é pesquisa externa, não fonte final
9. Ollama/Gemma classifica e resume, não decide sozinho
10. Guto atua como auditor cognitivo

---

### state-machine.md

# State Machine

DRAFT → REVIEW → APPROVED → VERSIONED → SUPERSEDED

Regras:
- Apenas APPROVED pode virar PR
- VERSIONED só após merge
- SUPERSEDED nunca é deletado

---

### notion-github-sync-policy.md

# Sync Policy

Notion → GitHub:
- Apenas APPROVED
- Sempre via branch + PR
- Nunca merge automático

GitHub → Notion:
- Status
- Changelog
- Links
- Commit SHA

Proibido:
- Sobrescrever código
- Alterar conteúdo técnico direto

---

### tool-roles.md

# Tool Roles

Notion:
- captura e pensamento bruto

GitHub:
- fonte canônica versionada

Antigravity:
- executor de tarefas

Ollama/Gemma:
- classificação e resumo

Perplexity:
- pesquisa externa

PowerShell/Python:
- execução local

GitHub Actions:
- validação e automação

Guto:
- auditor cognitivo e de direção

---

4. commitar workflow:

git add .
git commit -m "chore: add workflow system + governance bootstrap"
