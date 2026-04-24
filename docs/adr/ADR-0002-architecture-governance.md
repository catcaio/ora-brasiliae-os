# ADR-0002: Governança do Ecossistema e Contratos de Operação

Status: REVIEW
Origem: Notion / Arquitetura e Governança
Data: 2026-04-24
Owner: Rafael Barros
Auditor cognitivo: Guto

## Contexto
O projeto Ora Brasiliae evoluiu de uma fase de ideação bruta no Notion para uma fase de execução estruturada no GitHub. Existe a necessidade de formalizar como os componentes do ecossistema CONDSTORE OS interagem e como as regras de negócio são traduzidas em governança técnica, evitando que "desejos de produto" sejam confundidos com "restrições de arquitetura".

## Decisão Proposta
Implementar uma camada de "Contratos de Operação" que define os limites entre o núcleo operacional (Core) e as extensões (Features). 
- Toda nova funcionalidade deve ser precedida por uma definição de interface clara.
- As regras de governança documentadas em `docs/governance/` têm precedência sobre qualquer implementação técnica ad-hoc.
- O ecossistema deve priorizar a estabilidade do Ledger Canônico (GitHub) sobre a agilidade da Captura Bruta (Notion).

## Consequências
- **Positivas:** Redução da ambiguidade operacional, proteção do núcleo contra overengineering, e clareza para futuros colaboradores.
- **Negativas:** Processo de criação de novas funcionalidades torna-se ligeiramente mais burocrático devido à necessidade de validação contratual prévia.

## Riscos
- **Descompasso Notion-GitHub:** Se as regras mudarem no Notion e não forem refletidas nos ADRs, a governança pode se tornar obsoleta.
- **Excesso de Rigidez:** Um contrato muito estrito pode sufocar a inovação em estágios iniciais de features.

## Relação com ADR-0001
Este ADR complementa o [ADR-0001](./ADR-0001-system-architecture.md) ao detalhar a camada operacional do CONDSTORE OS, enquanto o ADR-0001 estabeleceu a soberania do GitHub e o papel dos agentes.

## Critério de Aceite
- Todas as novas issues de "Feature" devem citar este ADR.
- O Auditor Cognitivo (Guto) deve validar se as novas propostas respeitam os contratos definidos.
