# Integração Jules ↔ Market Lab (WIN Pipeline)

Este documento descreve a infraestrutura de auditoria diária do mini-índice (WIN) utilizando o agente Jules.

## Visão Geral

O objetivo desta integração é garantir a rastreabilidade e integridade dos dados manuais inseridos no Market Lab. O Jules atua como um supervisor operacional que valida snapshots e gera relatórios de conformidade.

## Componentes

1. **Snapshots (`data/market-lab/`):** Arquivos JSON contendo os dados do pregão.
2. **Validador (`src/lib/validate-win-snapshot.ts`):** Lógica central que verifica regras de negócio (ex: High >= Low).
3. **Relatórios (`reports/market-lab/`):** Documentação markdown da qualidade dos dados por dia.
4. **Jules CLI:** Interface que orquestra a validação e integração com Linear/GitHub.

## Fluxo Operacional Diário

1. O operador humano (ou sistema externo) deposita o snapshot do dia em `data/market-lab/`.
2. O Jules executa o pipeline: `npm run jules:daily-win-audit`.
3. O relatório é gerado em `reports/market-lab/YYYY-MM-DD-win-report.md`.
4. O Jules registra o resultado na issue do Linear correspondente.
5. Caso haja novos relatórios, uma PR é aberta para versionar a evidência.

## Comandos Disponíveis

| Comando | Descrição |
|---------|-----------|
| `npm run market:validate-snapshot -- <file>` | Valida a estrutura e lógica de um snapshot. |
| `npm run market:daily-report -- <file>` | Gera o relatório markdown para o snapshot. |
| `npm run jules:daily-win-audit` | Executa o pipeline completo de auditoria do dia. |

## Configuração do Ambiente

As seguintes variáveis devem ser configuradas no `.env`:

- `JULES_LINEAR_INTEGRATION_ENABLED`: Habilita registro no Linear.
- `JULES_DEFAULT_ISSUE`: ID da issue padrão para auditoria (ex: BRASIL-3).
- `MARKET_LAB_DATA_MODE`: `sandbox` ou `production`.

## Limitações (V1)

- Jules não busca dados externos (ex: APIs de mercado).
- Validação estritamente documental e lógica básica.
- Não há integração direta com corretoras.

## Próximos Passos

- Integração com APIs oficiais para cross-check automático.
- Expansão para outros ativos (Dólar, Ações).
- Alertas automáticos via Slack/Discord em caso de dados `insufficient`.
