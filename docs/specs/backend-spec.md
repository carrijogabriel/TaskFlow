# Especificacao de Backend

## Objetivo

Definir responsabilidades esperadas para backend ou camada equivalente de negocio. A arquitetura ainda esta em aberto, portanto esta especificacao e preliminar.

## Responsabilidades esperadas

Caso exista backend, ele devera:

- Receber requisicoes relacionadas a tarefas.
- Validar dados de entrada.
- Aplicar regras de negocio.
- Persistir e recuperar tarefas.
- Retornar respostas consistentes.
- Tratar erros de forma segura.

Caso a primeira versao seja apenas frontend, essas responsabilidades deverao existir em uma camada local de acoes ou servicos, mantendo separacao entre interface e regra de negocio.

## Regras de negocio

- Uma tarefa deve ter identificador unico.
- Uma tarefa deve ter titulo valido.
- Uma tarefa deve ter status valido.
- Tarefas novas devem iniciar como pendentes.
- Ao concluir uma tarefa, o status deve mudar para concluida e `completedAt` deve ser preenchido.
- Ao reabrir uma tarefa, o status deve voltar para pendente e `completedAt` deve ser limpo ou preservado conforme decisao futura documentada.
- Ao editar uma tarefa, `updatedAt` deve ser atualizado.
- Exclusao deve remover a tarefa ou marcar como removida, conforme decisao futura sobre auditoria e recuperacao.

## Validacoes necessarias

- Titulo obrigatorio.
- Titulo sem conteudo vazio apos remover espacos nas extremidades.
- Limite maximo de caracteres para titulo.
- Descricao opcional com limite maximo de caracteres, se existir.
- Status restrito a valores permitidos.
- Identificador em formato esperado.
- Datas em formato valido quando recebidas externamente.

## Operacoes esperadas

- Criar tarefa.
- Listar tarefas.
- Buscar tarefa por identificador, se necessario.
- Atualizar tarefa.
- Concluir tarefa.
- Reabrir tarefa.
- Excluir tarefa.

## Possiveis endpoints

Se houver API HTTP, endpoints preliminares podem ser:

- `GET /tasks`: listar tarefas.
- `POST /tasks`: criar tarefa.
- `GET /tasks/{id}`: buscar tarefa especifica, se necessario.
- `PATCH /tasks/{id}`: atualizar campos editaveis.
- `PATCH /tasks/{id}/complete`: concluir tarefa.
- `PATCH /tasks/{id}/reopen`: reabrir tarefa.
- `DELETE /tasks/{id}`: excluir tarefa.

Esses endpoints sao uma proposta inicial e deverao ser revisados quando a arquitetura for definida.

## Cuidados com erros e respostas

- Respostas de erro devem ser claras para o cliente.
- Detalhes internos nao devem ser expostos ao usuario final.
- Entradas invalidas devem retornar erro de validacao.
- Tarefa inexistente deve retornar erro apropriado.
- Operacoes repetidas devem ter comportamento previsivel, como concluir tarefa ja concluida.

## Arquivos provaveis em etapas futuras

Dependendo da arquitetura escolhida, podem existir:

- Controladores ou rotas de tarefas.
- Servicos de regras de negocio.
- Repositorios ou camada de persistencia.
- Esquemas de validacao.
- Testes de unidade e integracao.
