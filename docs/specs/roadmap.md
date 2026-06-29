# Roadmap Inicial

## Objetivo

Organizar a evolucao do TaskFlow em etapas pequenas, documentadas e revisaveis.

## Etapa 1: Documentacao e especificacoes

Status: documentada.

Objetivo:

- Criar base documental do projeto.
- Registrar escopo, requisitos, riscos e decisoes preliminares.
- Preparar o projeto para implementacoes futuras orientadas por especificacao.

## Etapa 2: Estrutura inicial do projeto

Objetivo:

- Escolher tecnologia inicial.
- Documentar estrutura base da aplicacao.
- Documentar comandos para rodar o projeto.
- Evitar dependencias desnecessarias.

Criterios de aceitacao:

- Stack tecnica esta definida ou recomendada.
- Estrutura de pastas esta documentada.
- Comandos principais estao documentados.
- Nenhuma funcionalidade de tarefa e implementada.

Observacao:

- A inicializacao tecnica do projeto com Vite deve ocorrer em uma etapa futura, apos especificacao do comando, arquivos esperados, dependencias e riscos.

## Etapa 3: Interface basica

Objetivo:

- Criar layout inicial.
- Exibir areas de criacao, pendentes e concluidas.
- Preparar estados vazios.

Criterios de aceitacao:

- Interface clara em desktop e telas menores.
- Nenhuma regra de negocio complexa acoplada ao layout.

## Etapa 4: CRUD local de tarefas

Objetivo:

- Criar, listar, editar e excluir tarefas localmente.
- Validar campos.
- Exibir feedbacks basicos.

Criterios de aceitacao:

- Usuario consegue executar o CRUD basico.
- Entradas invalidas sao recusadas.
- Conteudo do usuario e exibido de forma segura.

## Etapa 5: Separacao entre pendentes e concluidas

Objetivo:

- Marcar tarefas como concluidas.
- Exibir listas separadas.
- Avaliar fluxo de reabrir tarefa.

Criterios de aceitacao:

- Pendentes e concluidas ficam visualmente separadas.
- Mudancas de status sao evidentes.

## Etapa 6: Melhorias de UX

Objetivo:

- Refinar feedbacks.
- Melhorar confirmacao ou desfazer exclusao.
- Ajustar responsividade.
- Revisar acessibilidade basica.

Criterios de aceitacao:

- Fluxos principais sao compreensiveis para usuarios leigos.
- Exclusao acidental tem protecao adequada.

## Etapa 7: Persistencia de dados

Objetivo:

- Definir estrategia de persistencia.
- Implementar armazenamento local ou remoto conforme decisao documentada.
- Garantir que dados sejam recuperados apos recarregar, se esse for o objetivo da etapa.

Criterios de aceitacao:

- Dados persistem conforme especificado.
- Falhas de persistencia sao tratadas.

## Etapa 8: Testes

Objetivo:

- Implementar testes para fluxos principais.
- Cobrir validacoes e estados visuais relevantes.
- Incluir verificacoes basicas de acessibilidade e seguranca.

Criterios de aceitacao:

- Testes principais executam com sucesso.
- Casos de erro importantes estao cobertos.

## Etapa 9: Revisao de seguranca

Objetivo:

- Revisar validacoes.
- Revisar tratamento de erros.
- Revisar dependencias.
- Verificar ausencia de segredos.

Criterios de aceitacao:

- Riscos conhecidos estao documentados.
- Nenhum segredo esta versionado.
- Entradas maliciosas comuns nao executam codigo.

## Etapa 10: Preparacao para deploy

Objetivo:

- Documentar ambiente de execucao.
- Definir processo de build.
- Revisar configuracoes publicas.
- Preparar checklist de release.

Criterios de aceitacao:

- Projeto tem instrucoes claras de execucao e build.
- Configuracoes sensiveis nao sao expostas.

## Observacao

Cada etapa futura deve comecar por uma especificacao propria antes da implementacao.
