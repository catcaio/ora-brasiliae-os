# security-check

## Objetivo
Executar checagem mínima de segurança antes de commit ou merge.

## Processo
1. Procurar possíveis secrets em arquivos alterados:
   - token
   - secret
   - api_key
   - password
   - private_key
   - bearer
   - ghp_
   - sk-
2. Verificar comandos proibidos em workflows e relatórios:
   - --force
   - checkout --orphan
   - reset --hard
   - filter-branch
   - rebase em branch compartilhada
3. Reportar achados.
4. Se achado crítico existir, bloquear commit ou merge.

## Saída obrigatória
- arquivos verificados
- achados
- decisão: PASS ou BLOCK
