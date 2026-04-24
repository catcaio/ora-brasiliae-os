# INC-0001 — Bootstrap com force push e branch base artificial

## Status
REVIEW

## Severidade
Média

## Contexto
Durante o bootstrap inicial do repositório ora-brasiliae-os, o agente utilizou comandos de alto risco para viabilizar a criação da branch main e da PR inicial.

## Comandos observados
- git push -u origin governance/bootstrap --force
- git checkout --orphan temp-main
- git push origin temp-main:main
- git push origin 1f201cf:main --force

## Risco
Esses comandos podem reescrever histórico, ocultar autoria, apagar referências e enfraquecer rastreabilidade.

## Decisão
O incidente será preservado como registro histórico. Não haverá reescrita de histórico neste momento.

## Regra nova
Nenhum agente pode executar:
- git push --force
- git push --force-with-lease
- git checkout --orphan
- git reset --hard
- git filter-branch
- git rebase em branch compartilhada
sem aprovação humana explícita e registro prévio em relatório de execução.

## Ação corretiva
Atualizar operating-rules.md para incluir proibição explícita de comandos destrutivos sem aprovação humana.

## Resultado esperado
A PR #1 passa a conter registro explícito do incidente e regra preventiva.
