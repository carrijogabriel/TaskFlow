# Especificacao do Modelo de Dados

## Entidade `Task`

`Task` representa uma tarefa cadastrada pelo usuario.

## Campos iniciais

| Campo | Tipo esperado | Obrigatorio | Descricao |
| --- | --- | --- | --- |
| `id` | string | Sim | Identificador unico da tarefa. |
| `title` | string | Sim | Titulo curto da tarefa. |
| `description` | string | Nao | Detalhamento opcional da tarefa. |
| `status` | string | Sim | Estado da tarefa: `pending` ou `completed`. |
| `createdAt` | string/data | Sim | Data de criacao. |
| `updatedAt` | string/data | Sim | Data da ultima atualizacao. |
| `completedAt` | string/data/null | Nao | Data de conclusao, preenchida quando concluida. |

## Validacoes

### `id`

- Deve ser unico.
- Deve ser gerado pelo sistema.
- Nao deve ser editavel pelo usuario.

### `title`

- Obrigatorio.
- Nao pode conter apenas espacos.
- Deve ter limite maximo definido antes da implementacao.
- Deve ser exibido como texto seguro.

### `description`

- Opcional.
- Pode ser adiado para etapa futura se a primeira interface precisar ser ainda mais simples.
- Deve ter limite maximo definido antes da implementacao, se implementado.
- Deve ser exibido como texto seguro.

### `status`

- Deve aceitar apenas valores predefinidos.
- Valor inicial deve ser `pending`.
- Ao concluir, deve mudar para `completed`.
- Ao reabrir, deve voltar para `pending`.

### Datas

- `createdAt` deve ser definido na criacao.
- `updatedAt` deve ser atualizado a cada edicao relevante.
- `completedAt` deve ser preenchido na conclusao.
- A decisao sobre limpar ou preservar `completedAt` ao reabrir deve ser tomada antes da implementacao.

## Ciclo de vida da tarefa

1. Criada como pendente.
2. Pode ser editada.
3. Pode ser concluida.
4. Pode ser reaberta, se o fluxo for implementado.
5. Pode ser excluida.

## Suposicoes

- Ainda nao ha banco de dados definido.
- O formato final das datas dependera da tecnologia escolhida.
- O modelo podera evoluir para incluir prioridade, prazo, etiquetas ou usuario responsavel em etapas futuras.
