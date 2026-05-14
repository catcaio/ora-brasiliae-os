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

## Scheduled Task diária

A auditoria diária é executada automaticamente via **GitHub Actions** + **Jules API** (`google-labs-code/jules-invoke@v1`).

### Configuração

| Campo | Valor |
|-------|-------|
| **Nome da tarefa** | `Ora Brasiliae Market Lab — Daily WIN Snapshot Audit` |
| **Workflow** | `.github/workflows/jules-daily-win-audit.yml` |
| **Frequência** | Dias úteis (segunda a sexta) |
| **Horário** | 18:30 BRT (21:30 UTC — cron: `30 21 * * 1-5`) |
| **Branch base** | `governance/bootstrap` |
| **Issue Linear** | BRASIL-4 |
| **Prompt** | Conteúdo de `prompts/jules/daily-win-snapshot-audit.md` |

### Pré-requisito: API Key

O secret `JULES_API_KEY` deve estar configurado no repositório:

1. Acesse [jules.google.com](https://jules.google.com) → **Settings** → **API Keys**
2. Gere uma chave (máximo 3 ativas simultâneas)
3. No GitHub: **Settings** → **Secrets and variables** → **Actions** → `JULES_API_KEY`

### Comportamento quando snapshot existe

1. Jules atualiza checkout de `governance/bootstrap`
2. Localiza `data/market-lab/YYYY-MM-DD-win-snapshot.json`
3. Executa `npm run jules:daily-win-audit`
4. Gera relatório em `reports/market-lab/YYYY-MM-DD-win-report.md`
5. Classifica qualidade como `complete`, `partial` ou `insufficient`
6. Registra evidência na issue Linear BRASIL-4
7. Abre PR contra `governance/bootstrap` se houver artefato versionável

### Comportamento quando snapshot não existe

1. Gera relatório de ausência: `reports/market-lab/YYYY-MM-DD-win-report.md`
2. Classifica como `insufficient`
3. Registra que o dado do dia não foi fornecido
4. **Não usa snapshot de exemplo como fallback**
5. **Não inventa dados**

### Como auditar execuções

- Acesse **Actions** → `Ora Brasiliae — Daily WIN Snapshot Audit (Jules)` no GitHub
- Verifique logs do job `jules-daily-win-audit`
- Consulte os comentários na issue Linear BRASIL-4

### Como disparar manualmente (dry-run)

```bash
# Via GitHub CLI
gh workflow run jules-daily-win-audit.yml

# Via npm (execução local sem Jules)
npm run jules:daily-win-audit
```

### Como pausar/desativar a task

- **Temporariamente:** No GitHub Actions → selecione o workflow → **Disable workflow**
- **Permanentemente:** Remova ou comente o bloco `schedule:` no arquivo `.github/workflows/jules-daily-win-audit.yml`

### Limitações da V1

- Jules não busca dados externos (ex: APIs de mercado B3)
- Não há integração com corretoras
- A tarefa não executa em feriados — apenas filtra dias da semana (seg–sex)
- O secret `JULES_API_KEY` tem validade conforme política da Google Jules API

---

## Próximos Passos

- Integração com APIs oficiais para cross-check automático.
- Expansão para outros ativos (Dólar, Ações).
- Alertas automáticos via Slack/Discord em caso de dados `insufficient`.
