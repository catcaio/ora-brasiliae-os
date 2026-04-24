# close-pr

## Objetivo
Fechar uma PR com governança.

## Regras
- Nunca fazer merge se houver blocker
- Nunca fazer merge sem relatório de auditoria
- Nunca fazer squash/rebase sem aprovação explícita
- Preferir merge commit simples no início do projeto

## Processo
1. Executar pr-audit
2. Se APPROVE:
   - fazer merge
   - atualizar status dos artefatos para VERSIONED quando aplicável
   - criar relatório final
3. Se REQUEST_CHANGES ou BLOCK:
   - não fazer merge
   - listar ações corretivas

## Saída obrigatória
- decisão
- merge realizado ou bloqueado
- relatório final
