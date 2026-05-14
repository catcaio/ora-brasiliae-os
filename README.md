# ora-brasiliae-os

## Ora Brasiliae Market Lab (Sandbox Educacional)
O **Market Lab** \u00E9 um ambiente sandbox voltado para o estudo e simula\u00E7\u00E3o de opera\u00E7\u00F5es no mercado futuro de mini-\u00EDndice (WIN). 

### Como Rodar Localmente
```bash
npm install
npm run dev
```

### Comandos Dispon\u00EDveis
- `npm run dev`: Inicia o servidor de desenvolvimento.
- `npm test`: Executa a su\u00EDte de testes.
- `npm run build`: Gera o bundle de produ\u00E7\u00E3o.
- `npm run lint`: Executa a verifica\u00E7\u00E3o de linting.

### Aviso Importante
- **Sandbox Educacional**: Este sistema \u00E9 estritamente para fins de aprendizado e simula\u00E7\u00E3o.
- **V1 - Sem Conex\u00E3o Externa**: Esta vers\u00E3o n\u00E3o possui integra\u00E7\u00E3o com corretoras, feeds de dados ou APIs externas. Todos os dados s\u00E3o manuais.
- **Linear**: [BRASIL-1](https://linear.app/condstoreos/issue/BRASIL-1/mvp-001-ora-brasiliae-market-lab-win-sandbox-operacional)
- **PR**: #13

---

## Branch canônica atual
- **Branch padrão:** `governance/bootstrap`.
- **Base obrigatória para PRs:** `governance/bootstrap`.
- **`main` preservada para normalização futura:** não usar `main` como destino automático nesta etapa.

## Prop\u00F3sito
Este reposit\u00F3rio \u00E9 o n\u00FAcleo operacional e cient\u00EDfico do projeto **Ora Brasiliae**, integrando governan\u00E7a de software (CONDSTORE OS) e rigor de pesquisa cient\u00EDfica. O objetivo \u00E9 criar um ambiente totalmente audit\u00E1vel, reprodut\u00EDvel e governado por princ\u00EDpios de integridade epistemol\u00F3gica.

## Regra Central
- **GitHub \u00E9 o Ledger Can\u00F4nico**: O reposit\u00F3rio Git \u00E9 a \u00FAnica fonte da verdade para o estado do projeto, decis\u00F5es e artefatos versionados.
- **Notion \u00E9 Captura Bruta**: O Notion serve para rascunhos, idea\u00E7\u00E3o, captura de informa\u00E7\u00F5es desestruturadas e rastro de pensamento vivo.

## Fluxo Operacional M\u00EDnimo
O fluxo de trabalho segue o ciclo de vida:
`Notion \u2192 Issue \u2192 Antigravity \u2192 PR \u2192 CI \u2192 Docs/Reports \u2192 Notion`

## Estados Oficiais
Todos os artefatos e documentos devem ser classificados em um dos seguintes estados:
- **DRAFT**: Rascunho inicial, sujeito a mudan\u00E7as estruturais.
- **REVIEW**: Em processo de auditoria ou revis\u00E3o por agentes/humanos.
- **APPROVED**: Aprovado para integra\u00E7\u00E3o, mas ainda n\u00E3o consolidado na `main`.
- **VERSIONED**: Consolidado na branch `main` e parte da verdade can\u00F4nica.
- **SUPERSEDED**: Substitu\u00EDdo por uma vers\u00E3o mais recente ou decis\u00E3o posterior.

## Mapa de Diret\u00F3rios
- [`.agents/`](./.agents/): Configura\u00E7\u00F5es e identidades dos agentes.
- [`.github/`](./.github/): Templates de Issue e Pull Request.
- [`docs/adr/`](./docs/adr/): Registro de Decis\u00F5es de Arquitetura (ADRs).
- [`docs/governance/`](./docs/governance/): Pol\u00EDticas, regras e manuais de opera\u00E7\u00E3o.
- [`evals/`](./evals/): Testes e avalia\u00E7\u00F5es de modelos de linguagem.
- [`notebooks/`](./notebooks/): Pesquisa cient\u00EDfica e experimentos execut\u00E1veis.
- [`prompts/`](./prompts/): Biblioteca de prompts versionados para os agentes.
- [`reports/`](./reports/): Relat\u00F3rios de auditoria e execu\u00E7\u00E3o.

## Regras de Opera\u00E7\u00E3o
1. **Uso de Agentes**: Agentes operam sob pap\u00E9is espec\u00EDficos (Antigravity, Guto, Perplexity, Gemma) e nunca possuem permiss\u00E3o de merge direto na `main`.
2. **PR Obrigat\u00F3rio**: Nenhuma altera\u00E7\u00E3o entra na `main` sem um Pull Request, revis\u00E3o e, se necess\u00E1rio, um relat\u00F3rio de auditoria.
3. **Identidade Clara**: Todo commit deve ser atribu\u00EDdo corretamente ao seu autor (humano ou agente identificado).

## Links \u00DAteis
- [Regras Operacionais](./docs/governance/operating-rules.md)
- [Pol\u00EDtica de Sincroniza\u00E7\u00E3o Notion-GitHub](./docs/governance/notion-github-sync-policy.md)
- [Pap\u00E9is e Ferramentas](./docs/governance/tool-roles.md)
- [Registro de Decis\u00F5es (ADRs)](./docs/adr/) ([ADR-0002](./docs/adr/ADR-0002-architecture-governance.md))
- [Relat\u00F3rios de Execu\u00E7\u00E3o](./reports/)
