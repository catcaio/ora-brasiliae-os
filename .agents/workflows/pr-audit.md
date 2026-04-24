# pr-audit

## Objetivo
Auditar uma PR aberta antes de merge.

## Processo
1. Buscar estado da PR.
2. Verificar:
   - mergeable
   - arquivos alterados
   - commits
   - autoria
   - presença de relatório de execução
   - presença de incidente quando necessário
   - ausência de secrets
   - ausência de comandos destrutivos não autorizados
3. Gerar relatório em reports/audits/
4. Recomendar:
   - APPROVE
   - REQUEST_CHANGES
   - BLOCK

## Saída obrigatória
- status
- blockers
- riscos
- recomendação
