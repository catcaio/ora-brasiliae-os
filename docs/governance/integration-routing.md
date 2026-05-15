# Integration Routing Policy

Esta política define quando usar Notion, GitHub, Linear, ClickUp e Slack no fluxo do Ora Brasiliae OS.

## Regra central

GitHub continua sendo o ledger canônico. As demais ferramentas são nós auxiliares do fluxo. Elas podem capturar, coordenar, comunicar ou espelhar estado, mas não substituem issue, PR, commit, ADR ou relatório versionado.

## Roteamento por ferramenta

### Notion

Use para captura bruta, rascunhos, ideação e visibilidade gerencial. Conteúdo do Notion só entra no GitHub quando estiver aprovado e for promovido por issue ou PR.

### GitHub

Use para código, documentação versionada, governança, issues, branches, pull requests, ADRs e reports. Quando houver conflito entre ferramentas, o GitHub prevalece.

### Linear

Use quando a tarefa precisar de backlog estruturado, ciclo, milestone, projeto de produto ou delegação para time de engenharia. A issue do Linear deve apontar para a issue ou PR correspondente no GitHub quando o trabalho alterar o repositório.

### ClickUp

Use para tarefas operacionais, rotina pessoal, calendário, execução recorrente ou acompanhamento administrativo. O ClickUp pode espelhar uma tarefa GitHub, mas não decide arquitetura nem estado canônico.

### Slack

Use para alinhamento rápido, pedidos de revisão e status compartilhável. Decisões relevantes tomadas no Slack devem ser promovidas de volta ao GitHub como comentário, issue, ADR ou relatório.

## Matriz de decisão

- Ideia solta: Notion.
- Trabalho versionável: GitHub Issue.
- Planejamento de produto: Linear.
- Execução operacional: ClickUp.
- Comunicação rápida: Slack.
- Decisão durável: GitHub ADR ou report.

## Anti-padrão evitado

Não transportar conversas inteiras entre ferramentas. O fluxo deve transportar estado mínimo: objetivo, contexto, decisão, evidência, risco e próximo passo.
