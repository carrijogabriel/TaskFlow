# Especificacao de UX e Navegabilidade

## Objetivo

Garantir que o TaskFlow seja simples para usuarios leigos, com fluxos previsiveis e pouca carga cognitiva.

## Navegacao geral

A experiencia inicial deve funcionar em uma tela principal. O usuario nao deve precisar navegar por varias paginas para executar o CRUD basico.

Ordem recomendada da tela:

1. Criacao de nova tarefa.
2. Lista de tarefas pendentes.
3. Lista de tarefas concluidas.

## Adicionar tarefa

- O campo principal deve indicar claramente que o usuario deve digitar uma tarefa.
- A acao de criar deve ser visivel e direta.
- Se o titulo estiver vazio, o sistema deve explicar o erro.
- Apos criar, a tarefa deve aparecer em pendentes.
- O formulario deve voltar a um estado pronto para nova entrada.

## Editar tarefa

- A edicao deve ocorrer sem confundir a tarefa editada com as demais.
- O usuario deve ter acoes claras de salvar e cancelar.
- Cancelar nao deve alterar a tarefa.
- Salvar deve validar os campos antes de atualizar.

## Concluir tarefa

- A acao de concluir deve estar disponivel em tarefas pendentes.
- Ao concluir, a tarefa deve mudar de secao ou status de forma evidente.
- O usuario deve receber feedback curto de sucesso.

## Reabrir tarefa

- Reabrir pode ser util para corrigir conclusoes acidentais.
- Se implementado, deve estar disponivel apenas em tarefas concluidas.
- A tarefa reaberta deve voltar para pendentes.
- A interface deve evitar que reabrir pareca uma criacao de nova tarefa.

## Excluir tarefa

- Excluir e uma acao potencialmente destrutiva.
- O sistema deve reduzir risco de exclusao acidental.
- A protecao pode ser confirmacao, desfazer temporario ou outro padrao definido antes da implementacao.
- O texto da acao deve deixar claro que a tarefa sera removida.

## Evitar confusao entre pendentes e concluidas

- Usar titulos de secao claros.
- Manter tarefas pendentes antes das concluidas.
- Usar texto, icone ou marcador de status alem de cor.
- Reduzir peso visual de concluidas sem prejudicar leitura.
- Evitar misturar acoes diferentes sem contexto.

## Simplicidade para usuarios leigos

- Usar textos curtos e diretos.
- Evitar termos tecnicos.
- Manter acoes proximas da tarefa correspondente.
- Exibir mensagens de erro recuperaveis.
- Evitar excesso de filtros, menus ou configuracoes na primeira versao.

## Criterios de aceitacao de UX

- Um usuario consegue criar uma tarefa sem instrucoes externas.
- Um usuario entende quais tarefas ainda estao pendentes.
- Um usuario entende quais tarefas ja foram concluidas.
- Um usuario consegue editar, concluir e excluir uma tarefa sem procurar em menus complexos.
- Em telas pequenas, a ordem e as acoes continuam compreensiveis.
