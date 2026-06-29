# Setup e Comandos Planejados

## Objetivo

Documentar os comandos esperados para instalar, desenvolver, validar e preparar o projeto.

Como o projeto ainda nao foi inicializado tecnicamente, os comandos abaixo sao planejados. Eles devem ser confirmados na etapa de scaffolding antes de serem executados.

## Inicializacao recomendada

Ferramenta:

- Vite com template `react-ts`.

Comando recomendado para criar a base do projeto:

```bash
npm create vite@latest . -- --template react-ts
```

Observacao importante:

- O repositorio ja contem documentacao.
- Antes de executar o comando, sera necessario verificar se a ferramenta preservara os arquivos existentes.
- Caso o comando nao seja seguro em repositorio nao vazio, a alternativa sera criar a estrutura manualmente ou inicializar em pasta temporaria e copiar apenas os arquivos aprovados.

## Instalacao

Comando planejado:

```bash
npm install
```

Objetivo:

- Instalar dependencias declaradas no `package.json`.

Status:

- Ainda nao deve ser executado nesta etapa.

## Desenvolvimento local

Comando planejado:

```bash
npm run dev
```

Objetivo:

- Iniciar servidor local do Vite para desenvolvimento.

Status:

- Planejado para depois da inicializacao tecnica.

## Build

Comando planejado:

```bash
npm run build
```

Objetivo:

- Validar TypeScript e gerar build de producao.

Script recomendado futuramente:

```json
{
  "build": "tsc -b && vite build"
}
```

## Preview

Comando planejado:

```bash
npm run preview
```

Objetivo:

- Servir localmente o build gerado para conferencia.

## Lint

Comando planejado:

```bash
npm run lint
```

Objetivo:

- Verificar problemas de padrao, qualidade e possiveis erros no codigo.

Status:

- Depende da configuracao de ESLint.

## Testes

Comandos planejados:

```bash
npm run test
npm run test:watch
npm run test:coverage
```

Objetivo:

- Executar testes automatizados quando Vitest e bibliotecas de teste forem adicionados.

Status:

- Planejado para etapa futura. Nao existe ainda.

## Testes end-to-end

Comando planejado futuro:

```bash
npm run test:e2e
```

Objetivo:

- Validar fluxos completos no navegador quando houver interface funcional.

Status:

- Futuro. Nao deve ser adicionado antes de existir fluxo de usuario a validar.

## Variaveis de ambiente

No inicio, nao ha variaveis de ambiente previstas.

Se forem necessarias no futuro:

- Criar `.env.example` sem valores sensiveis.
- Nao versionar arquivos com segredos reais.
- Documentar cada variavel e seu uso.
- Usar apenas prefixos publicos quando a variavel puder ser exposta ao frontend.

## Arquivos esperados apos inicializacao tecnica

Quando a etapa de scaffolding for aprovada, arquivos provaveis:

- `package.json`
- `package-lock.json`
- `index.html`
- `src/main.tsx`
- `src/app/App.tsx` ou equivalente ajustado
- `src/styles/global.css`
- `tsconfig.json`
- `vite.config.ts`
- configuracao de ESLint

Esses arquivos nao foram criados nesta etapa.
