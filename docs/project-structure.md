# Estrutura Inicial de Pastas

## Objetivo

Propor uma organizacao inicial para o projeto antes da criacao do codigo.

Esta estrutura deve ser usada como guia na etapa de inicializacao tecnica. Ela ainda nao representa arquivos existentes.

## Estrutura recomendada

```txt
TaskFlow/
  docs/
    README.md
    project-overview.md
    tech-stack.md
    architecture.md
    setup.md
    project-structure.md
    development-workflow.md
    specs/
      product-spec.md
      frontend-spec.md
      backend-spec.md
      ux-spec.md
      security-spec.md
      data-model-spec.md
      api-spec.md
      testing-spec.md
      roadmap.md
  public/
  src/
    app/
      App.tsx
      App.module.css
    components/
      ui/
      layout/
      feedback/
    features/
      tasks/
        components/
        hooks/
        services/
        validation/
        types.ts
        constants.ts
        README.md
        __tests__/
    hooks/
    lib/
      errors/
      validation/
      storage/
    styles/
      global.css
      tokens.css
    types/
    tests/
      setup.ts
  index.html
  package.json
  tsconfig.json
  vite.config.ts
```

## Funcao de cada pasta

### `docs/`

Contem documentacao, especificacoes, decisoes tecnicas e roadmap.

### `public/`

Contem arquivos estaticos publicos que nao passam pelo pipeline de importacao do frontend.

### `src/app/`

Contem a raiz da aplicacao frontend, composicao geral e configuracoes de alto nivel da interface.

### `src/components/`

Contem componentes reutilizaveis que nao pertencem exclusivamente a uma feature.

Subpastas sugeridas:

- `ui/`: botoes, campos, dialogos e elementos pequenos.
- `layout/`: estruturas de pagina, cabecalho e containers.
- `feedback/`: mensagens, alertas e estados de erro ou sucesso.

### `src/features/tasks/`

Contem tudo que pertence diretamente ao dominio de tarefas.

Subpastas sugeridas:

- `components/`: componentes especificos de tarefas.
- `hooks/`: hooks especificos do fluxo de tarefas.
- `services/`: regras e operacoes de tarefas.
- `validation/`: validadores de titulo, descricao e status.
- `types.ts`: tipos TypeScript da feature.
- `constants.ts`: limites e constantes da feature.
- `README.md`: documentacao curta da feature, quando houver implementacao.
- `__tests__/`: testes da feature.

### `src/hooks/`

Hooks reutilizaveis que nao pertencem exclusivamente a tarefas.

### `src/lib/`

Utilitarios de infraestrutura, como tratamento de erros, validacao generica e adaptadores de armazenamento.

### `src/styles/`

Estilos globais, tokens CSS e regras compartilhadas.

### `src/types/`

Tipos globais que nao pertencem a uma feature especifica.

### `src/tests/`

Configuracao compartilhada para testes.

## Organizacao por dominio de tarefas

A feature `tasks` deve concentrar:

- Tipo `Task`.
- Tipo `TaskStatus`.
- Limites de campos.
- Validacao de entrada.
- Componentes de tarefa.
- Acoes de criar, editar, concluir, reabrir e excluir.
- Testes da feature.

Essa organizacao reduz acoplamento e deixa claro onde alterar o comportamento de tarefas.

## O que nao criar ainda

Nesta etapa nao devem ser criados:

- Componentes finais de tarefa.
- Formulario de criacao.
- Botoes de CRUD.
- Servicos reais de persistencia.
- API.
- Banco de dados.
- Autenticacao.

## Criterios para criar novas pastas no futuro

Uma nova pasta deve existir apenas se:

- Tiver responsabilidade clara.
- Evitar mistura de dominios.
- Facilitar testes ou manutencao.
- Estiver alinhada a uma especificacao aprovada.
