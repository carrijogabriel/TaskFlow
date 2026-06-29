# Documentacao do TaskFlow

Este diretorio centraliza a documentacao inicial e as especificacoes do projeto TaskFlow.

O projeto sera desenvolvido com uma abordagem de Spec Driven Development. Antes de cada implementacao, a etapa deve ter uma especificacao clara, com objetivo, comportamento esperado, requisitos, criterios de aceitacao, riscos, impactos de seguranca, impactos de UX e arquivos provaveis de alteracao.

## Como usar esta documentacao

1. Leia a visao geral do projeto em [project-overview.md](./project-overview.md).
2. Consulte as especificacoes em [specs/](./specs/) antes de planejar qualquer implementacao.
3. Atualize a documentacao sempre que uma decisao tecnica, regra de negocio ou etapa do roadmap mudar.
4. Mantenha as proximas implementacoes pequenas, revisaveis e alinhadas aos criterios de aceitacao.

## Arquivos principais

- [project-overview.md](./project-overview.md): contexto, escopo inicial e limites do projeto.
- [tech-stack.md](./tech-stack.md): stack tecnica recomendada e justificativa.
- [architecture.md](./architecture.md): arquitetura inicial proposta e separacao de responsabilidades.
- [setup.md](./setup.md): comandos planejados de instalacao, desenvolvimento, build, lint e testes.
- [project-structure.md](./project-structure.md): estrutura inicial de pastas proposta.
- [development-workflow.md](./development-workflow.md): fluxo de trabalho com Spec Driven Development.
- [specs/product-spec.md](./specs/product-spec.md): especificacao de produto, jornadas e criterios gerais.
- [specs/frontend-spec.md](./specs/frontend-spec.md): especificacao preliminar da interface.
- [specs/backend-spec.md](./specs/backend-spec.md): regras e responsabilidades esperadas para backend ou camada equivalente.
- [specs/ux-spec.md](./specs/ux-spec.md): experiencia do usuario e navegabilidade.
- [specs/security-spec.md](./specs/security-spec.md): cuidados de seguranca desde a primeira versao.
- [specs/data-model-spec.md](./specs/data-model-spec.md): modelo inicial da entidade `Task`.
- [specs/api-spec.md](./specs/api-spec.md): acoes e possiveis endpoints futuros.
- [specs/testing-spec.md](./specs/testing-spec.md): estrategia inicial de testes e validacao.
- [specs/roadmap.md](./specs/roadmap.md): evolucao planejada por etapas.

## Regras de trabalho

- Nao implementar funcionalidades sem especificacao previa.
- Nao adicionar dependencias sem justificativa documentada.
- Nao adicionar segredos, tokens ou configuracoes sensiveis no codigo.
- Priorizar seguranca, UX, navegabilidade, organizacao e documentacao.
- Documentar suposicoes tecnicas enquanto a arquitetura ainda estiver em aberto.
- Manter a documentacao em portugues, clara e facil de atualizar.

## Status atual

Esta documentacao define a base de produto e a proposta tecnica inicial do projeto. Ainda nao ha implementacao de telas, componentes, rotas, banco de dados, API ou logica de negocio.
