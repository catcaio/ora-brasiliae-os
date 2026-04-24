# Operating Rules

## Princípios Fundamentais
- **GitHub é fonte canônica**: O repositório git é a única fonte da verdade para o estado do projeto.
- **Notion é captura bruta**: O Notion serve para rascunhos, ideação e captura de informações desestruturadas.
- **Nada importante entra sem PR**: Alterações significativas no código ou documentação devem passar por revisão via Pull Request.
- **Notion nunca sobrescreve GitHub**: Em caso de conflito, a versão do GitHub prevalece.
- **Antigravity nunca trabalha direto na main**: Todas as tarefas do agente devem ser realizadas em branches específicas.
- **Nenhum agente pode commitar com identidade genérica**: Commits devem ter autoria clara e vinculada ao responsável (Rafael Barros).
- **Toda decisão relevante vira artefato versionado**: Decisões de arquitetura e mudanças de rumo devem ser registradas como ADRs.
- **Toda execução relevante gera relatório**: Tarefas complexas realizadas por agentes devem ser documentadas em `reports/executions/`.
- **Perplexity é pesquisa externa, não fonte final**: Dados obtidos via Perplexity devem ser validados e citados, nunca aceitos cegamente.
- **Ollama/Gemma classifica e resume, não decide sozinho**: Modelos locais são auxiliares de processamento, não instâncias de decisão final.
- **Guto atua como auditor cognitivo**: O papel do Guto é revisar a lógica, consistência e integridade epistemológica do projeto.
