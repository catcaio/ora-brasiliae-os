# ADR-0001: Arquitetura base do ora-brasiliae-os

Status: APPROVED
Data: 2026-04-24
Owner: Rafael Barros
Auditor cognitivo: Guto

## Contexto
O projeto precisa sustentar dois domínios integrados, mas com necessidades distintas:
- **CONDSTORE OS**: Governança operacional e execução de software.
- **Ora Brasiliae**: Governança epistemológica, pesquisa científica e rigor reprodutível.

## Decisão
Adotar uma arquitetura híbrida, **repo-first**, **code-first** e **state-first**. A verdade do sistema reside no estado versionado do repositório, enquanto as ferramentas de suporte (IA e captura) orbitam esse núcleo.

## Regras decididas
- **GitHub é fonte canônica versionada**: Nenhuma decisão é final até estar no Git.
- **Notion é captura bruta e pensamento vivo**: Espaço de ideação sem necessidade de rigor inicial.
- **Toda consolidação passa por branch, diff e PR**: Bloqueio de alterações diretas na branch principal.
- **Agentes não fazem merge direto**: A última palavra é sempre humana ou via processo de CI aprovado.
- **Antigravity executa tarefas em branch**: Operações são isoladas e rastreáveis.
- **Perplexity pesquisa, mas não consolida verdade**: Fontes externas são subsídios, não axiomas.
- **Ollama/Gemma classificam e resumem, mas não decidem sozinhos**: Auxiliares de processamento de dados.
- **Guto atua como auditor cognitivo**: Guardião da coerência e integridade do processo.
- **LangGraph, Vertex, MCP e n8n ficam fora da fase inicial**: Foco em estabilidade estrutural antes da automação complexa.

## Consequências
- **Positivas**: Maior rastreabilidade, menor risco de fragmentação de conhecimento, fluxo preparado para automação futura de alta confiança.
- **Negativas**: Menor velocidade de automação inicial devido à necessidade de intervenção humana e processos manuais assistidos.

## Fora de escopo nesta fase
- LangGraph e orquestração complexa de agentes.
- Integração nativa com Vertex AI ou n8n.
- Implementação de MCP (Model Context Protocol).
- RAG (Retrieval-Augmented Generation) ou Knowledge Graphs avançados.
- Observabilidade avançada de telemetria.

## Critério de sucesso
O sistema deve conseguir fechar um ciclo manual assistido completo:
`Notion → Issue → Antigravity → PR → CI → Report → Notion`
