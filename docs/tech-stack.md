# Stack Tecnica Recomendada

## Decisao

A stack recomendada para iniciar o TaskFlow e:

- Biblioteca principal: React.
- Linguagem: TypeScript.
- Build e desenvolvimento local: Vite.
- Estilizacao: CSS Modules com CSS global para tokens e resets basicos.
- Testes unitarios e de componentes: Vitest e React Testing Library, em etapa futura.
- Testes end-to-end: Playwright, em etapa futura quando houver fluxos navegaveis.
- Backend inicial: nenhum backend real na primeira implementacao.
- Persistencia inicial: estado local em memoria; `localStorage` pode ser avaliado em etapa futura.
- Backend/API futura: API HTTP separada ou camada server-side a definir quando houver necessidade real.

## Justificativa

React com TypeScript e Vite e adequado para este projeto porque oferece uma base simples, conhecida e facil de evoluir sem exigir uma arquitetura pesada no inicio.

Principais motivos:

- Simplicidade: Vite cria uma aplicacao pequena e direta, com poucos conceitos iniciais.
- Seguranca: TypeScript reduz erros de contrato e ajuda a modelar `Task`, status e acoes permitidas.
- Manutenibilidade: React permite separar interface em componentes claros e testaveis.
- Boa UX: a aplicacao pode ser responsiva e interativa sem complexidade desnecessaria.
- Testabilidade: Vitest e React Testing Library se integram bem com Vite.
- Evolucao futura: a estrutura pode receber persistencia, API, autenticacao e backend sem reescrever o projeto desde o zero.
- Deploy simples: uma aplicacao Vite pode ser publicada como arquivos estaticos enquanto nao houver backend.

## Por que nao Next.js agora

Next.js e uma boa opcao para aplicacoes que precisam de rotas server-side, renderizacao no servidor, autenticacao integrada ou API routes desde o inicio.

Para o escopo atual, essas capacidades seriam mais complexas do que o necessario. Como o TaskFlow comeca como uma aplicacao simples de CRUD visual e possivel persistencia local, Vite com React reduz acoplamento e acelera a evolucao incremental.

Next.js pode ser reconsiderado se surgirem requisitos fortes de:

- Autenticacao com sessoes server-side.
- API integrada no mesmo projeto.
- Renderizacao no servidor.
- SEO publico relevante.
- Multiusuario com regras de acesso no servidor.

## Estrategia de estilizacao

A recomendacao inicial e usar CSS Modules para estilos de componentes e um arquivo global para:

- Variaveis CSS de cor, espacamento e tipografia.
- Reset basico.
- Estilos globais de acessibilidade, como foco visivel.

Essa escolha evita dependencia de framework visual no inicio, reduz risco de complexidade e mantem a interface sob controle.

Tailwind pode ser avaliado no futuro se houver ganho real de velocidade e consistencia, mas nao deve ser adicionado sem justificativa.

## Estrategia futura de testes

Quando a implementacao comecar, a estrategia recomendada e:

- Vitest para regras puras, validadores e servicos.
- React Testing Library para componentes e interacoes.
- Playwright para fluxos principais quando houver interface navegavel.
- Testes de acessibilidade basica com verificacoes automatizadas e revisao manual.

Nenhum teste sera implementado nesta etapa documental.

## Estrategia futura de backend

O backend nao deve ser criado na primeira implementacao. A aplicacao pode comecar com uma camada local bem separada, como `taskService`, para evitar acoplar regras diretamente aos componentes.

Se o projeto evoluir para backend, a decisao devera ser precedida por nova especificacao contemplando:

- API HTTP.
- Validacao no servidor.
- Persistencia em banco de dados.
- Autenticacao e autorizacao.
- Tratamento seguro de erros.
- Variaveis de ambiente.

## Estrategia futura de persistencia

A evolucao recomendada e:

1. Estado em memoria para validar interface e regras basicas.
2. `localStorage` apenas se a etapa de persistencia local for aprovada e especificada.
3. Banco de dados remoto apenas se houver backend, usuarios reais ou necessidade de sincronizacao.

## Dependencias previstas

Dependencias provaveis ao inicializar o projeto:

- `react`
- `react-dom`
- `typescript`
- `vite`
- `@vitejs/plugin-react`
- `eslint`

Dependencias futuras de teste, se aprovadas:

- `vitest`
- `@testing-library/react`
- `@testing-library/user-event`
- `@testing-library/jest-dom`
- `jsdom`
- `playwright` ou `@playwright/test`

Antes de instalar qualquer dependencia, a etapa deve documentar o motivo, o comando e os arquivos esperados.

## Criterios de aceitacao desta decisao

- A stack atende ao escopo atual sem adicionar complexidade desnecessaria.
- A stack permite evoluir para persistencia, API e autenticacao em etapas futuras.
- A stack favorece TypeScript, testes e organizacao por dominio.
- A decisao esta alinhada com seguranca, UX, navegabilidade e documentacao.
