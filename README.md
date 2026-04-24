# ora-brasiliae-os

## Propósito
Este repositório é o núcleo operacional e científico do projeto **Ora Brasiliae**, integrando governança de software (CONDSTORE OS) e rigor de pesquisa científica. O objetivo é criar um ambiente totalmente auditável, reprodutível e governado por princípios de integridade epistemológica.

## Regra Central
- **GitHub é o Ledger Canônico**: O repositório Git é a única fonte da verdade para o estado do projeto, decisões e artefatos versionados.
- **Notion é Captura Bruta**: O Notion serve para rascunhos, ideação, captura de informações desestruturadas e rastro de pensamento vivo.

## Fluxo Operacional Mínimo
O fluxo de trabalho segue o ciclo de vida:
`Notion → Issue → Antigravity → PR → CI → Docs/Reports → Notion`

## Estados Oficiais
Todos os artefatos e documentos devem ser classificados em um dos seguintes estados:
- **DRAFT**: Rascunho inicial, sujeito a mudanças estruturais.
- **REVIEW**: Em processo de auditoria ou revisão por agentes/humanos.
- **APPROVED**: Aprovado para integração, mas ainda não consolidado na `main`.
- **VERSIONED**: Consolidado na branch `main` e parte da verdade canônica.
- **SUPERSEDED**: Substituído por uma versão mais recente ou decisão posterior.

## Mapa de Diretórios
- [`.agents/`](./.agents/): Configurações e identidades dos agentes.
- [`.github/`](./.github/): Templates de Issue e Pull Request.
- [`docs/adr/`](./docs/adr/): Registro de Decisões de Arquitetura (ADRs).
- [`docs/governance/`](./docs/governance/): Políticas, regras e manuais de operação.
- [`evals/`](./evals/): Testes e avaliações de modelos de linguagem.
- [`notebooks/`](./notebooks/): Pesquisa científica e experimentos executáveis.
- [`prompts/`](./prompts/): Biblioteca de prompts versionados para os agentes.
- [`reports/`](./reports/): Relatórios de auditoria e execução.

## Regras de Operação
1. **Uso de Agentes**: Agentes operam sob papéis específicos (Antigravity, Guto, Perplexity, Gemma) e nunca possuem permissão de merge direto na `main`.
2. **PR Obrigatório**: Nenhuma alteração entra na `main` sem um Pull Request, revisão e, se necessário, um relatório de auditoria.
3. **Identidade Clara**: Todo commit deve ser atribuído corretamente ao seu autor (humano ou agente identificado).

## Links Úteis
- [Regras Operacionais](./docs/governance/operating-rules.md)
- [Política de Sincronização Notion-GitHub](./docs/governance/notion-github-sync-policy.md)
- [Papéis e Ferramentas](./docs/governance/tool-roles.md)
- [Registro de Decisões (ADRs)](./docs/adr/)
- [Relatórios de Execução](./reports/)
