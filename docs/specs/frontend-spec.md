# Especificacao de Frontend

## Objetivo

Definir a experiencia visual e comportamental esperada para a interface antes da implementacao.

Esta especificacao nao define tecnologia, framework ou biblioteca. Essas escolhas deverao ser documentadas antes da criacao do projeto.

## Areas principais da interface

- Cabecalho simples com nome do produto.
- Area de criacao de tarefa.
- Lista de tarefas pendentes.
- Lista de tarefas concluidas.
- Area de feedback para mensagens de sucesso, erro ou confirmacao.

## Organizacao visual

As tarefas pendentes e concluidas devem ficar em areas visualmente separadas.

Recomendacao inicial:

- Pendentes devem aparecer primeiro, pois exigem acao.
- Concluidas devem aparecer depois, com menor peso visual.
- Cada secao deve ter titulo claro e contador de itens, se isso ajudar a leitura.
- Estados vazios devem explicar de forma curta que nao ha tarefas naquela categoria.

## Estados visuais das tarefas

Uma tarefa pode estar nos seguintes estados:

- Pendente: destaque normal, com acoes de editar, concluir e excluir.
- Concluida: destaque reduzido, indicacao clara de conclusao e acoes de reabrir, editar se permitido e excluir.
- Em edicao: campos editaveis visiveis, com acoes de salvar e cancelar.
- Com erro de validacao: mensagem objetiva proxima ao campo afetado.

## Comportamento de botoes e acoes

- Criar: adiciona uma nova tarefa quando os dados forem validos.
- Editar: abre modo de edicao para a tarefa selecionada.
- Salvar: aplica alteracoes validas.
- Cancelar: abandona alteracoes nao salvas.
- Concluir: muda o status para concluida.
- Reabrir: muda o status para pendente, se esse fluxo for adotado.
- Excluir: remove a tarefa apos protecao contra exclusao acidental.

Todos os botoes devem ter textos ou rotulos acessiveis claros.

## Feedback para o usuario

O sistema deve informar:

- Quando uma tarefa for criada.
- Quando uma tarefa for atualizada.
- Quando uma tarefa for concluida.
- Quando uma tarefa for reaberta.
- Quando uma tarefa for excluida.
- Quando uma acao falhar.
- Quando houver erro de validacao.

Feedbacks devem ser curtos, compreensiveis e nao devem expor detalhes tecnicos sensiveis.

## Comportamento em telas menores

- O layout deve se adaptar a celulares e tablets.
- Formularios e listas devem ocupar largura confortavel.
- Botoes devem permanecer clicaveis ou tocaveis.
- Textos longos devem quebrar linha sem invadir outros elementos.
- A ordem de leitura deve continuar natural: criar tarefa, pendentes, concluidas.

## Acessibilidade inicial

- Campos de formulario devem ter rotulos claros.
- Mensagens de erro devem estar associadas ao campo correspondente quando possivel.
- A interface deve ser navegavel por teclado.
- Acoes iconicas, se existirem, devem ter nome acessivel.
- Cores nao devem ser o unico meio de comunicar status.
- Contraste entre texto e fundo deve ser suficiente.

## Arquivos provaveis em etapas futuras

Dependendo da tecnologia escolhida, a implementacao podera criar ou alterar:

- Componente de formulario de tarefa.
- Componente de item de tarefa.
- Componente de lista de tarefas.
- Estilos globais ou modulares.
- Utilitarios de validacao.
- Testes de interface.
