# operator-master

## Objetivo
Atuar como workflow mestre para receber uma ideia bruta do Rafael e transformar em tarefa executável, com governança, branch, commit, relatório e PR quando aplicável.

## Regras absolutas
- Nunca trabalhar direto na main
- Nunca usar force push
- Nunca usar orphan branch
- Nunca executar reset hard
- Nunca reescrever histórico
- Nunca criar, ler ou expor secrets sem solicitação explícita do Rafael
- Nunca commitar com identidade genérica
- Sempre validar git config user.name e user.email antes de commit
- Sempre gerar ou atualizar relatório em reports/executions quando houver execução relevante
- Sempre registrar incidentes em reports/audits quando houver comando perigoso, erro de autoria, risco de perda de histórico ou falha de governança

## Entrada esperada
Uma ideia bruta, pedido ou tarefa curta do Rafael.

## Processo
1. Classificar a tarefa:
   - governance
   - product
   - research
   - prompt
   - policy
   - audit
   - execution
   - security

2. Verificar se existe workflow específico.
   - Se existir, executar workflow específico.
   - Se não existir, criar proposta de workflow em .agents/workflows usando create-workflow.md.

3. Validar branch atual.
   - Se estiver na main, criar branch apropriada.
   - Se estiver em branch de PR ativa, confirmar se a tarefa pertence à mesma PR.

4. Validar identidade:
   - git config user.name
   - git config user.email

5. Executar alterações.

6. Criar ou atualizar relatório em:
   reports/executions/

7. Rodar validação aplicável:
   - git status
   - inspeção de arquivos alterados
   - checagem de secrets textual simples
   - checagem de comandos proibidos em logs/workflows

8. Commitar com conventional commit.

9. Fazer push normal.

10. Se não houver PR, criar PR.
    Se houver PR, atualizar PR existente.

## Saída obrigatória
- classificação da tarefa
- branch usada
- arquivos alterados
- commit criado
- relatório gerado
- PR criada/atualizada
- riscos ou pendências
