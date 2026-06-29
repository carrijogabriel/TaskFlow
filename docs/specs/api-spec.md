# Especificacao de API ou Camada de Acoes

## Objetivo

Descrever as acoes esperadas para manipular tarefas. Esta especificacao e preliminar porque a arquitetura ainda nao foi definida.

O projeto pode usar:

- Uma API HTTP com backend.
- Uma camada local de servicos no frontend.
- Uma solucao hibrida em etapa futura.

Independentemente da arquitetura, as regras de entrada, saida e erro devem ser consistentes.

## Acoes esperadas

### Criar tarefa

Entrada esperada:

- `title`
- `description`, se existir

Resultado esperado:

- Nova tarefa criada com `status` igual a `pending`.
- `id`, `createdAt` e `updatedAt` gerados pelo sistema.

Erros esperados:

- Titulo ausente.
- Titulo invalido.
- Entrada acima do limite permitido.

### Listar tarefas

Entrada esperada:

- Nenhuma obrigatoria no escopo inicial.

Resultado esperado:

- Lista de tarefas.
- Possibilidade de separar por status na camada de apresentacao ou na resposta, conforme arquitetura definida.

### Atualizar tarefa

Entrada esperada:

- `id`
- Campos editaveis, como `title` e `description`

Resultado esperado:

- Tarefa atualizada.
- `updatedAt` atualizado.

Erros esperados:

- Tarefa inexistente.
- Campos invalidos.

### Concluir tarefa

Entrada esperada:

- `id`

Resultado esperado:

- `status` alterado para `completed`.
- `completedAt` preenchido.
- `updatedAt` atualizado.

### Reabrir tarefa

Entrada esperada:

- `id`

Resultado esperado:

- `status` alterado para `pending`.
- `updatedAt` atualizado.
- Tratamento de `completedAt` conforme decisao documentada antes da implementacao.

### Excluir tarefa

Entrada esperada:

- `id`

Resultado esperado:

- Tarefa removida ou marcada como removida, conforme decisao futura.

Erros esperados:

- Tarefa inexistente.
- Falha de permissao, caso autenticacao exista no futuro.

## Possiveis endpoints HTTP

| Metodo | Caminho | Objetivo |
| --- | --- | --- |
| `GET` | `/tasks` | Listar tarefas. |
| `POST` | `/tasks` | Criar tarefa. |
| `GET` | `/tasks/{id}` | Buscar tarefa especifica, se necessario. |
| `PATCH` | `/tasks/{id}` | Atualizar tarefa. |
| `PATCH` | `/tasks/{id}/complete` | Concluir tarefa. |
| `PATCH` | `/tasks/{id}/reopen` | Reabrir tarefa. |
| `DELETE` | `/tasks/{id}` | Excluir tarefa. |

## Padrao de resposta preliminar

Se houver API, respostas devem ser previsiveis:

- Sucesso deve retornar dados atualizados ou confirmacao objetiva.
- Erros de validacao devem indicar o problema sem detalhes internos.
- Erros inesperados devem retornar mensagem generica e segura.

## Arquivos provaveis em etapas futuras

- Definicoes de rotas ou handlers.
- Servico de tarefas.
- Validadores.
- Tipos ou contratos de dados.
- Testes de contrato, unidade ou integracao.
