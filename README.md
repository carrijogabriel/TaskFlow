# TaskFlow

TaskFlow é uma aplicação web de gerenciamento de tarefas criada para organizar tarefas pendentes e concluídas de forma simples, clara e funcional.

## Sobre o projeto

O TaskFlow permite gerenciar tarefas em uma interface limpa e direta. O usuário pode:

- adicionar tarefas;
- editar tarefas;
- concluir tarefas;
- reabrir tarefas concluídas;
- excluir tarefas;
- visualizar tarefas pendentes e concluídas separadamente.

## Objetivo

O objetivo do projeto é construir uma aplicação simples, funcional e bem organizada, servindo como base para evoluções futuras com mais recursos, melhorias de experiência e possível integração com backend.

## Status do projeto

O projeto está em desenvolvimento.

O MVP inicial já possui as principais funcionalidades de gerenciamento de tarefas, persistência local no navegador e testes automatizados para proteger os fluxos principais.

## Funcionalidades atuais

- Criação de tarefas.
- Descrição opcional.
- Listagem de tarefas pendentes.
- Listagem de tarefas concluídas.
- Contadores por seção.
- Edição de tarefas.
- Conclusão e reabertura de tarefas.
- Exclusão com confirmação.
- Persistência local com `localStorage`.
- Testes automatizados para regras do hook e fluxos principais da interface.

## Tecnologias utilizadas

- React.
- TypeScript.
- Vite.
- CSS Modules.
- CSS global para tokens de estilo.
- Vitest.
- React Testing Library.
- Testing Library User Event.
- Jest DOM.
- jsdom.

## Como executar o projeto

Instale as dependências:

```bash
npm install
```

Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

Execute o build de produção:

```bash
npm run build
```

Execute os testes automatizados:

```bash
npm run test:run
```

## Documentação técnica

A documentação técnica e decisões iniciais do projeto estão disponíveis em:

[README Técnico](./docs/README_TECNICO.md)

## Próximos passos

- Melhorias pontuais de UX.
- Refinamento visual da interface.
- Ampliação da cobertura de testes.
- Filtros ou busca de tarefas.
- Possível backend futuramente.
