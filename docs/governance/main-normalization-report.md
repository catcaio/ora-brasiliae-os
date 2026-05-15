# Relatório de Reconciliação: `main` e `governance/bootstrap`

## 1. Estado Atual das Branches

A branch `governance/bootstrap` foi estabelecida como a branch canônica operacional do Ora Brasiliae OS a partir da issue BRASIL-2. Atualmente, `main` está desatualizada em relação a todo o desenvolvimento feito nas issues BRASIL-1 a BRASIL-4, mas possui alguns commits históricos e arquivos próprios (testes e2e) que não foram migrados para a branch canônica.

## 2. Divergência Mapeada

### Commits únicos em `governance/bootstrap` (Avanço Funcional)
A branch canônica possui toda a estrutura do Market Lab, documentações operacionais, integrações com o Notion e configurações do agente Jules.
* `79da965` BRASIL-4 — Configurar Jules Scheduled Task diário do Market Lab (#16)
* `a0a4fc7` BRASIL-3 — Jules daily WIN snapshot pipeline (#15)
* `8183296` docs: add canonical branch section to README
* `f6254d4` Merge pull request #13 (BRASIL-1 MVP-001 Ora Brasiliae Market Lab)
* `cde21a2` feat: implement WIN market lab sandbox MVP
* `d3dc696` docs: add workflow executors execution report
* `807f870` docs: add integration routing policy
* E outros relativos ao bootstrap operacional.

### Commits únicos em `main` (Histórico Legado/Testes)
A branch `main` possui commits que tratam da versão inicial do ADR-0001 e de testes e2e:
* `072e666` Merge pull request #5 from catcaio/governance/adr-0001-system
* `b68bab3` docs: finalize execution report
* `0cca14b` docs: add PR audit report
* `7830590` feat: add ADR-0001 system architecture

### Arquivos exclusivos de `main` (Serão preservados na reconciliação)
* `reports/audits/PR-0005-e2e-test-audit.md`
* `reports/executions/EXEC-0003-e2e-system-test.md`

### Arquivos divergentes (Risco de Conflito)
O único arquivo com modificações divergentes diretas é:
* `docs/adr/ADR-0001-system-architecture.md`

Todo o restante (códigos-fonte, configurações do Next.js, scripts, integração com Jules, etc.) é exclusivo da branch `governance/bootstrap` e entrará em `main` como adição de novos arquivos.

## 3. Recomendação Técnica e Estratégia Escolhida

Como `governance/bootstrap` é a branch canônica e "fonte da verdade" do estado atual do repositório, o objetivo da reconciliação é tornar `main` um espelho funcional de `governance/bootstrap`, preservando os relatórios antigos de testes e2e sem quebrar a governança recém-estabelecida.

**Estratégia:**
1. Criar branch intermediária a partir da `main` (`sync/main-from-governance-bootstrap`).
2. Fazer `git merge origin/governance/bootstrap` na branch intermediária.
3. Se houver conflitos (ex: `ADR-0001`), resolver mantendo **sempre** a versão da `governance/bootstrap`, pois reflete a arquitetura mais atual (Next.js App Router, Market Lab, integração Linear/Notion).
4. Rodar todos os checks de CI localmente.
5. Abrir Pull Request de `sync/main-from-governance-bootstrap` contra `main`.

**Decisão:** Não fazer *force push*. A branch `main` não deve ser sobrescrita forçadamente para preservar o histórico do git e rastreabilidade dos primeiros commits do repositório.

## 4. Riscos Mapeados
* **Risco Baixo:** Conflito em arquivos de documentação antigos que podem precisar de resolução manual para adotar o conteúdo atualizado da branch canônica.
* Nenhum risco funcional, pois `main` não possui código concorrente ao código Typescript/Next.js atual da branch canônica.

## 5. Resolução e Validação

**Comandos executados para a reconciliação:**
```bash
git checkout main
git pull origin main
git checkout -b sync/main-from-governance-bootstrap
git merge origin/governance/bootstrap --no-edit
# Resolver conflito
git checkout origin/governance/bootstrap -- docs/adr/ADR-0001-system-architecture.md
git add docs/adr/ADR-0001-system-architecture.md
git commit -m "chore(brasil-5): resolve merge conflict using canonical governance/bootstrap version"
```

**Conflitos resolvidos:**
- `docs/adr/ADR-0001-system-architecture.md` (adicionado por ambas as branches com conteúdo distinto. Resolvido mantendo a versão da branch canônica `governance/bootstrap`).

**Resultados dos checks executados localmente:**
- `npm test`: Passou (11 testes, 2 arquivos).
- `npm run build`: Passou (rotas estáticas geradas).
- `npm run lint`: Passou (0 erros).
- `npm run market:validate-snapshot -- data/market-lab/example-win-snapshot.json`: Executado com sucesso.
- `npm run market:daily-report -- data/market-lab/example-win-snapshot.json`: Gerou relatório com sucesso.

**Decisão Final:**
A branch `sync/main-from-governance-bootstrap` está limpa, validada e apta para ser mesclada na `main` através de uma Pull Request, atingindo o objetivo de normalizar a branch sem utilizar force pushes.
