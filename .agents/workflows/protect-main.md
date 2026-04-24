# protect-main

## Objetivo
Procedimento para configurar e auditar as regras de proteção da branch `main` no GitHub.

## Regras
- Nunca aplicar regras de proteção que bloqueiem o acesso do Rafael Barros.
- Sempre documentar mudanças nas regras antes de aplicá-las.
- Revisar permissões de tokens e agentes semestralmente.

## Processo
1. Definir as regras de proteção (ex: code reviews, checks, signed commits).
2. Validar se o Rafael Barros tem permissões administrativas para gerenciar essas regras.
3. Aplicar as regras via interface do GitHub ou `gh api`.
4. Verificar se a proteção está ativa: `gh api repos/:owner/:repo/branches/main/protection`.
5. Registrar a configuração em `docs/governance/branch-protection-policy.md`.

## Saída obrigatória
- status da proteção
- regras ativas
- auditoria de acesso
