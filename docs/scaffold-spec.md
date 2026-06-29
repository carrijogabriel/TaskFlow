# Especificacao do Scaffold Inicial com Vite

## Objetivo do scaffold

O scaffold inicial servira apenas para criar a base tecnica do projeto TaskFlow com React, TypeScript e Vite.

Esta etapa futura de execucao nao deve implementar funcionalidades de tarefas. O scaffold deve criar somente a estrutura minima para que o projeto possa iniciar, compilar e evoluir de forma organizada.

Nao fazem parte do scaffold:

- CRUD de tarefas.
- Componentes finais de tarefas.
- Logica de adicionar, editar, concluir, reabrir ou excluir tarefas.
- Persistencia de dados.
- Backend ou API real.
- Autenticacao.
- Configuracao completa de testes.

## Comando exato planejado

Como o repositorio atual ja contem documentacao, o comando recomendado para a proxima etapa e criar o scaffold em uma subpasta temporaria:

```bash
npm create vite@latest taskflow-scaffold -- --template react-ts
```

Motivo:

- Evita sobrescrever arquivos ja existentes na raiz, especialmente `docs/`.
- Permite revisar todos os arquivos gerados antes de mover qualquer coisa.
- Reduz risco de apagar documentacao ou arquivos de controle do projeto.
- Mantem a decisao tecnica reversivel.

Depois da revisao, os arquivos aprovados poderao ser movidos para a raiz do projeto em uma etapa especifica e controlada.

Comando alternativo, apenas se a raiz for confirmada como segura para scaffold direto:

```bash
npm create vite@latest . -- --template react-ts
```

Esse comando alternativo nao e a recomendacao inicial porque a raiz nao esta vazia.

## Arquivos e pastas esperados apos o scaffold

Ao executar o scaffold em `taskflow-scaffold/`, a estrutura esperada e semelhante a:

```txt
taskflow-scaffold/
  index.html
  package.json
  tsconfig.json
  tsconfig.app.json
  tsconfig.node.json
  vite.config.ts
  eslint.config.js
  public/
    vite.svg
  src/
    App.css
    App.tsx
    assets/
      react.svg
    index.css
    main.tsx
```

Observacao:

- A lista pode variar conforme a versao do template do Vite.
- Arquivos demonstrativos do template, como logos e estilos de exemplo, deverao ser revisados antes de serem mantidos.
- Nenhum arquivo de feature `tasks` deve ser implementado nesta etapa.

## Dependencias esperadas

Dependencias de execucao:

- `react`: biblioteca principal de interface.
- `react-dom`: integracao do React com o DOM do navegador.

Dependencias de desenvolvimento esperadas:

- `typescript`: suporte a tipagem estatica.
- `vite`: servidor de desenvolvimento e build.
- `@vitejs/plugin-react`: integracao React com Vite.
- `eslint`: analise estatica de codigo, se incluido pelo template ou configurado depois.
- `@types/react`: tipos TypeScript para React.
- `@types/react-dom`: tipos TypeScript para React DOM.

Dependencias que podem aparecer conforme a versao do template:

- `@eslint/js`.
- `typescript-eslint`.
- `eslint-plugin-react-hooks`.
- `eslint-plugin-react-refresh`.
- `globals`.

Dependencias futuras, ainda nao instaladas nesta etapa:

- `vitest`.
- `@testing-library/react`.
- `@testing-library/user-event`.
- `@testing-library/jest-dom`.
- `jsdom`.
- `@playwright/test`.

## Organizacao inicial apos o scaffold

Depois do scaffold e da revisao dos arquivos gerados, a estrutura alvo do `src/` devera evoluir para:

```txt
src/
  app/
  components/
    ui/
    layout/
    feedback/
  features/
    tasks/
  hooks/
  lib/
    errors/
    validation/
    storage/
  styles/
  types/
```

Responsabilidades planejadas:

- `src/app/`: raiz da aplicacao e composicao principal.
- `src/components/`: componentes reutilizaveis e nao especificos de tarefas.
- `src/features/tasks/`: dominio de tarefas, a ser detalhado antes da implementacao.
- `src/hooks/`: hooks reutilizaveis.
- `src/lib/`: utilitarios e adaptadores internos.
- `src/styles/`: CSS global, tokens e estilos base.
- `src/types/`: tipos globais.

Importante:

- A pasta `features/tasks/` pode ser criada vazia ou com documentacao minima em etapa futura, mas nao deve receber implementacao de CRUD sem especificacao propria.
- A reorganizacao dos arquivos do template deve acontecer com cuidado para nao introduzir logica de produto antes da hora.

## CSS Modules e tokens globais

A estrategia planejada de estilos e:

- CSS global para tokens de design, variaveis, reset basico e estilos base.
- CSS Modules para estilos de componentes.
- Nomes de arquivos claros, como `App.module.css` e `TaskItem.module.css` em etapas futuras.
- Evitar estilos espalhados sem padrao.
- Evitar dependencia visual externa sem justificativa.
- Manter foco visivel, contraste adequado e responsividade desde a base.

Nesta etapa nao serao implementados estilos.

## Testes futuros

Os testes serao adicionados em etapa futura, depois que houver estrutura de codigo suficiente para validar.

Ferramentas planejadas:

- Vitest para testes unitarios.
- React Testing Library para componentes e interacoes.
- Playwright para fluxos completos no navegador.

Nesta etapa, o objetivo e apenas registrar a decisao. Nao serao criados arquivos de teste, configuracoes de teste ou scripts de teste.

## Decisoes pendentes

### Persistencia inicial

Pendente: memoria ou `localStorage`.

Recomendacao inicial: comecar em memoria para validar a interface e as regras basicas. Avaliar `localStorage` em uma etapa posterior especifica de persistencia.

### Exclusao segura

Pendente: confirmacao, desfazer temporario ou lixeira.

Recomendacao inicial: preferir desfazer temporario se a UX da etapa permitir. Caso contrario, usar confirmacao clara antes de remover.

### Campo `description`

Pendente: incluir ou nao na primeira UI.

Recomendacao inicial: comecar apenas com `title` para reduzir complexidade, mantendo `description` documentado como campo opcional futuro.

### Regra para `completedAt`

Pendente: limpar ou preservar ao reabrir tarefa.

Recomendacao inicial: limpar `completedAt` ao reabrir, pois a tarefa volta a representar trabalho pendente. Se houver historico futuro, preservar em outro mecanismo.

### Backend/API

Pendente: momento certo para criar backend ou API.

Recomendacao inicial: nao criar backend no inicio. Evoluir primeiro com frontend organizado e camada local bem separada.

## Riscos e cuidados

- Risco de sobrescrever arquivos existentes se o scaffold for executado direto na raiz.
- Necessidade de verificar se o repositorio esta limpo antes da execucao.
- Necessidade de revisar arquivos gerados antes de mover para a raiz.
- Possibilidade de o template do Vite mudar arquivos conforme a versao instalada.
- Evitar instalacao de dependencias desnecessarias.
- Evitar manter arquivos de exemplo que confundam a base do projeto.
- Evitar criar logica de negocio antes de uma especificacao aprovada.
- Manter documentacao em portugues.
- Manter segredos, tokens e variaveis sensiveis fora do repositorio.

## Validacoes antes da proxima etapa

Antes de executar o scaffold, conferir:

- Estrutura atual do repositorio.
- Arquivos existentes que podem ser sobrescritos.
- Se `package.json` ja existe.
- Se `src/` ja existe.
- Se `node_modules/` ja existe.
- Se o repositorio esta limpo ou se ha alteracoes pendentes.
- Compatibilidade com a documentacao ja criada.
- Se o comando em subpasta temporaria continua sendo a opcao mais segura.
- Se ha necessidade de criar o projeto na raiz ou manter em subpasta.
- Se a proxima etapa autoriza explicitamente execucao de comando e instalacao de dependencias.

## Criterios de aceitacao desta etapa

- O comando de scaffold esta documentado.
- Os arquivos esperados estao descritos.
- As dependencias previstas estao classificadas.
- A organizacao inicial apos scaffold esta proposta.
- A estrategia de CSS esta registrada.
- Os testes futuros estao registrados sem configuracao.
- As decisoes pendentes possuem recomendacao inicial.
- Os riscos e validacoes antes da execucao estao documentados.
- Nenhum comando de scaffold foi executado nesta etapa.
- Nenhuma dependencia foi instalada nesta etapa.
- Nenhum codigo de aplicacao foi criado nesta etapa.
