# State Machine of Artifacts

## Estados
- **DRAFT**: Artefato em fase inicial de criação, sem revisão.
- **REVIEW**: Artefato pronto para ser revisado por pares ou auditores.
- **APPROVED**: Artefato validado e pronto para ser integrado à branch principal.
- **VERSIONED**: Artefato oficialmente integrado à `main` e parte da linha de base.
- **SUPERSEDED**: Artefato que foi substituído por uma versão mais recente ou decisão superior.

## Transições Permitidas
- DRAFT → REVIEW
- REVIEW → APPROVED
- REVIEW → DRAFT (se rejeitado)
- APPROVED → VERSIONED
- VERSIONED → SUPERSEDED

## Transições Proibidas
- DRAFT → APPROVED (pular revisão)
- DRAFT → VERSIONED
- SUPERSEDED → ANY (artefatos obsoletos não podem ser reativados sem novo ciclo)
