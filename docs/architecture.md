# Arquitetura Inicial Proposta

## Objetivo

Definir uma arquitetura inicial simples para o TaskFlow, mantendo separacao entre interface, dominio, dados e documentacao.

Esta etapa nao cria codigo de aplicacao. A arquitetura descrita aqui deve orientar a futura inicializacao do projeto.

## Visao geral

A arquitetura recomendada para o inicio e uma SPA frontend com React, TypeScript e Vite.

Camadas previstas:

- Interface: componentes React responsaveis por exibicao e interacao.
- Dominio de tarefas: tipos, validacoes, regras e servicos relacionados a `Task`.
- Dados: adaptadores de armazenamento local ou API futura.
- Infraestrutura de frontend: app, estilos globais, configuracoes e testes.
- Documentacao: arquivos em `docs/`.

## Separacao entre frontend, backend e dados

### Frontend

Responsavel por:

- Renderizar a interface.
- Controlar estados visuais.
- Receber entradas do usuario.
- Exibir mensagens de feedback.
- Chamar a camada de dominio ou servicos.

O frontend nao deve espalhar regras de negocio diretamente em componentes de apresentacao.

### Backend

Nao sera criado inicialmente.

Se houver backend no futuro, ele devera assumir:

- Validacao confiavel no servidor.
- Persistencia.
- Autenticacao e autorizacao.
- Regras de acesso por usuario.
- Respostas de erro seguras.

### Camada de dados

No inicio, a camada de dados pode ser uma abstracao local, mesmo sem persistencia real. Essa separacao facilita trocar memoria por `localStorage` ou API no futuro.

Exemplo conceitual:

```txt
componentes -> hooks/actions -> taskService -> storage adapter
```

## Fluxo de dados inicial

1. Usuario interage com a interface.
2. Componente chama uma action, hook ou servico.
3. Validacao verifica a entrada.
4. Regra de negocio produz novo estado.
5. Interface atualiza a exibicao.
6. Feedback e mostrado ao usuario.

## Organizacao por dominio

A funcionalidade principal sera `tasks`. Ela deve ter um espaco proprio para:

- Tipos.
- Componentes especificos.
- Validacoes.
- Servicos ou actions.
- Testes.
- Documentacao da feature, se necessario.

Isso evita que o projeto vire uma colecao solta de componentes sem contexto.

## Limites de responsabilidade

Componentes devem:

- Receber dados por propriedades.
- Emitir eventos por callbacks.
- Manter estado visual local quando fizer sentido.
- Evitar conhecer detalhes de persistencia.

Hooks ou actions devem:

- Orquestrar interacoes da interface.
- Chamar validadores e servicos.
- Preparar feedbacks de sucesso ou erro.

Servicos devem:

- Centralizar regras de negocio.
- Aplicar validacoes.
- Chamar adaptadores de dados.

Adaptadores devem:

- Isolar memoria, `localStorage` ou API.
- Evitar que componentes dependam diretamente do mecanismo de armazenamento.

## Seguranca na arquitetura

Diretrizes iniciais:

- Usar TypeScript para modelar dados e status permitidos.
- Validar entradas antes de criar ou atualizar tarefas.
- Nao usar `dangerouslySetInnerHTML` para conteudo do usuario.
- Renderizar dados do usuario como texto.
- Evitar logs com dados sensiveis.
- Manter variaveis de ambiente fora do codigo.
- Revisar dependencias antes de adicionar pacotes.

## UX e acessibilidade na arquitetura

A estrutura deve facilitar:

- Componentes pequenos e reutilizaveis.
- Estados de vazio, erro, carregamento e sucesso.
- Rotulos acessiveis em campos e botoes.
- Foco visivel.
- Mensagens claras de validacao.
- Responsividade com CSS simples e previsivel.

## Decisoes em aberto

- Se a primeira persistencia sera apenas memoria ou `localStorage`.
- Se a acao de excluir usara confirmacao, desfazer temporario ou lixeira.
- Se `description` entra na primeira interface ou fica para etapa futura.
- Se `completedAt` sera limpo ou preservado ao reabrir tarefa.
- Quando e se havera backend real.

Esses pontos devem ser decididos em especificacoes futuras antes da implementacao correspondente.
