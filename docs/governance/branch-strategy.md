# Branch Strategy — Ora Brasiliae OS

## Status
- **Status:** ACTIVE
- **Data de formalização:** 2026-05-14
- **Issue:** BRASIL-2

## 1) Branch canônica atual
A branch canônica e operacional atual do repositório é **`governance/bootstrap`**.

Enquanto não houver decisão formal posterior, **toda nova branch de trabalho deve ser criada a partir de `governance/bootstrap`** e **todo PR deve apontar para `governance/bootstrap`**.

## 2) Contexto e justificativa
Conforme contexto validado na issue BRASIL-2:
- a default branch no GitHub está em `governance/bootstrap`;
- a PR #13 foi mergeada em `governance/bootstrap`;
- `main` não recebeu a PR #13;
- `governance/bootstrap` e `main` estão divergentes;
- `governance/bootstrap` está 18 commits à frente de `main`;
- `main` está 4 commits à frente de `governance/bootstrap`.

Por essa razão, **`governance/bootstrap` é a base operacional** no momento.

## 3) Regra operacional sobre `main`
Até nova decisão formal:
- **não usar `main` como destino automático de PR**;
- **não trabalhar direto em `main`**;
- preservar `main` para normalização futura controlada.

## 4) Fluxo padrão de execução
Fluxo obrigatório:

`Linear Issue → Jules/Antigravity/Codex → PR GitHub → Guto audit → merge`

## 5) Como agentes devem abrir branches e PRs
1. Atualizar branch base operacional (`governance/bootstrap`).
2. Criar branch de trabalho a partir dela (ex.: `docs/brasil-2-branch-strategy`).
3. Implementar mudanças pequenas, auditáveis e com escopo da issue.
4. Abrir PR com **base `governance/bootstrap`**.
5. Registrar evidências mínimas: branch, arquivos alterados, commit SHA, checks executados e ressalvas.

## 6) Pendência futura obrigatória
A sincronização **`governance/bootstrap` → `main`** fica explicitamente adiada para **issue separada**, com plano próprio e validação auditável.

## 7) Auditoria local (workspace desta execução)
Nesta execução local, os comandos Git mostram apenas a branch local de trabalho (sem refs remotas disponíveis no clone atual). Isso não altera a decisão de governança acima, que está baseada no contexto validado da issue BRASIL-2.
