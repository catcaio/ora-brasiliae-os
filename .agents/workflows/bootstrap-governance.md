# Workflow: Bootstrap de Governança

## Objetivo
Estabelecer a base normativa e a estrutura de diretórios para a governança do projeto Ora Brasiliae, garantindo rastreabilidade, autoria correta e separação de preocupações.

## Regras
- GitHub é a única fonte da verdade (canonical source).
- Toda alteração deve passar por Pull Request (PR).
- Identidade local de git deve ser validada antes de cada commit.
- Antigravity nunca commita diretamente na branch `main`.

## Diretórios Criados
- `.agents/workflows/`: Definições de processos para agentes.
- `docs/governance/`: Regras de operação e máquinas de estado.
- `docs/adr/`: Registro de decisões de arquitetura.
- `prompts/`: Repositório de instruções para agentes.
- `policies/`: Políticas de conformidade.
- `evals/`: Avaliações de modelos e saídas.
- `reports/`: Relatórios de execução e auditoria.
- `product/`: PRDs e decisões de produto.
- `notebooks/`: Experimentos e pesquisa.
- `research/`: Base de evidências e gaps.

## Arquivos Criados
- `operating-rules.md`: Regras fundamentais de operação.
- `state-machine.md`: Ciclo de vida de artefatos.
- `notion-github-sync-policy.md`: Política de sincronização.
- `tool-roles.md`: Papéis das ferramentas.
- Templates para ADR, Relatórios, PR e Issues.

## Política de PR
- Todo PR deve seguir o template estabelecido.
- Exige-se descrição clara do objetivo, escopo e evidências de validação.
- Nenhum PR é aberto sem relatório de execução anexo ou referenciado.

## Saída Esperada
Um repositório estruturado, com processos de decisão transparentes e auditáveis, preparado para a colaboração entre humanos e agentes de IA.
