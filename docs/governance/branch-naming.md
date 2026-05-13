# Branch Naming Policy

Esta política define nomes de branch para humanos e agentes. O objetivo é manter rastreabilidade entre captura, issue, execução, PR e relatório.

## Formato

```text
<tipo>/<issue>-<descricao-curta>
```

## Tipos permitidos

- `feat`: nova funcionalidade ou novo executor.
- `fix`: correção de comportamento.
- `docs`: documentação, ADR, política ou relatório.
- `chore`: manutenção operacional.
- `refactor`: reorganização sem mudança de comportamento.
- `test`: teste, avaliação ou validação automatizada.
- `research`: experimento, hipótese ou protótipo científico.

## Exemplos

```text
feat/11-workflow-executors
docs/11-update-tool-roles
research/12-quotes-eval
```

## Regras

1. Toda branch deve apontar para uma issue quando houver trabalho rastreável.
2. Agentes não trabalham diretamente em `main` nem em branches canônicas.
3. Branches devem ser curtas, sem acentos e em kebab-case.
4. O PR deve referenciar a issue de origem e o relatório de execução quando aplicável.

## Integrações

Linear, ClickUp e Slack podem referenciar a mesma issue GitHub, mas não substituem a branch nem o PR. Eles existem como camadas de coordenação, operação e comunicação.
