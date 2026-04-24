# Auditoria de Estrutura: ora-brasiliae-os

## 1. Estrutura Atual de Pastas
A estrutura base está sólida e segue o padrão esperado para um projeto governado por agentes:

```text
/
├── .agents/          # Configurações de agentes (Antigravity/Guto)
├── .github/          # Templates de Issue e PR
├── docs/             # Documentação técnica e governança
│   ├── adr/          # Architecture Decision Records
│   └── governance/   # Políticas e regras de operação
├── evals/            # Testes e avaliações de modelos
├── notebooks/        # Camada experimental/científica
├── policies/         # Regras de negócio ou dados
├── product/          # Artefatos relacionados ao "produto" final
├── prompts/          # Biblioteca de prompts para agentes
├── reports/          # Relatórios de execução e auditoria
│   ├── audits/
│   └── executions/
└── research/         # Pesquisa e rascunhos
```

## 2. Verificação de Itens Obrigatórios

| Item | Status | Observação |
| :--- | :---: | :--- |
| `/docs/governance` | OK | Contém 5 arquivos de política fundamentais. |
| `/docs/adr` | OK* | Pasta existe, template presente. ADR-0001 está em edição mas não persistido. |
| `/reports` | OK | Estrutura de subpastas e templates presente. |
| `/prompts` | OK | Pasta existe, mas está quase vazia (apenas `.gitkeep`). |
| Templates de PR | OK | `.github/PULL_REQUEST_TEMPLATE.md` presente. |
| Templates de Issue | OK | `bug.md` e `feature.md` presentes em `.github/ISSUE_TEMPLATE/`. |

## 3. Arquivos Implementados (Destaques)
- **Governança**: `operating-rules.md`, `branch-protection-policy.md`, `tool-roles.md`.
- **Relatórios**: `PR-0001-final-audit.md`, `INC-0001-bootstrap-force-push.md` (rastreabilidade de incidentes).
- **Políticas**: `notion-github-sync-policy.md`.

## 4. Lacunas Críticas Identificadas
1. **Ausência de README.md**: O repositório não possui um arquivo README na raiz. Isso é crítico para a orientação de qualquer auditor ou colaborador.
2. **Biblioteca de Prompts Vazia**: A pasta `/prompts/agents` contém apenas um `.gitkeep`. As instruções personalizadas dos agentes ainda não estão versionadas.
3. **Persistência de ADRs**: Embora o `ADR-0001` apareça como documento ativo no editor, ele ainda não foi commitado/salvo no sistema de arquivos.

## 5. Validação das Regras de Governança
- **Documentação**: As regras estão bem documentadas em `/docs/governance/operating-rules.md`.
- **Conflitos com o Plano**:
    - O plano exige que "toda decisão relevante vira artefato versionado", mas o primeiro ADR ainda não está no Git.
    - A política de branch protection menciona que a configuração via GitHub Settings está pendente.
- **Risco Principal**: **Fragmentação da Memória Operacional**. Sem o README e com os prompts/ADRs ainda voláteis (não persistidos), o projeto corre o risco de perder contexto se a sessão do agente for reiniciada antes do commit desses artefatos.

## Sugestões Imediatas
1. Criar um `README.md` robusto descrevendo a estrutura e o propósito do repositório.
2. Persistir e commitar o `ADR-0001-system-architecture.md`.
3. Iniciar o versionamento dos prompts base em `/prompts/agents`.
