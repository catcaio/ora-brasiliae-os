# Branch Protection Policy — main

## Definição
A branch `main` é a fonte canônica da verdade para o projeto Ora Brasiliae OS. Ela deve ser protegida contra alterações acidentais ou não autorizadas para garantir a integridade e rastreabilidade total do sistema.

## Regras de Proteção
- **Nenhum push direto na main**: Todas as alterações devem obrigatoriamente vir de Pull Requests.
- **Mudanças entram por PR**: Cada PR deve ser vinculada a uma tarefa, relatório ou incidente.
- **Exigir revisão humana**: Merge na `main` requer aprovação explícita do Rafael Barros.
- **Bloquear force push**: Comandos destrutivos que reescrevem o histórico da `main` são estritamente proibidos (confirmado no INC-0001).
- **Bloquear deletion**: A branch `main` não pode ser excluída.
- **Exigir branch atualizada**: Sempre que possível, a branch de origem deve estar sincronizada com a `main` antes do merge para evitar conflitos silenciosos.
- **Relatório de auditoria**: PRs que alterem o núcleo (core) ou governança exigem relatório de auditoria pré-merge.

## Operação de Agentes
- Agentes (Antigravity) só podem operar em branches dedicadas (`governance/*`, `feat/*`, `fix/*`, etc.).
- Comandos destrutivos (`--force`, `orphan`, `reset --hard`) exigem aprovação humana explícita e registro prévio em relatório de execução.

## Status da Implementação
- [x] Documentação da política
- [x] Workflow de auditoria versionado
- [ ] Configuração ativa via GitHub Settings (Pendência: permissões administrativas e token)
