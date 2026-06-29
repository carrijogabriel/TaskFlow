# Fluxo de Desenvolvimento

## Objetivo

Definir como o TaskFlow deve evoluir usando Spec Driven Development.

## Fluxo padrao por etapa

1. Receber solicitacao da etapa.
2. Revisar documentacao existente.
3. Propor especificacao da etapa antes de implementar.
4. Confirmar objetivo, requisitos, riscos e criterios de aceitacao.
5. Implementar apenas o escopo aprovado.
6. Validar com comandos e testes disponiveis.
7. Documentar arquivos alterados, riscos, testes e proximos passos.

## Antes de implementar codigo

Cada etapa de implementacao deve declarar:

- Objetivo.
- Comportamento esperado.
- Requisitos funcionais.
- Requisitos nao funcionais.
- Criterios de aceitacao.
- Riscos.
- Impactos de seguranca.
- Impactos de UX.
- Arquivos provaveis de criacao ou alteracao.

## Convencoes de organizacao

- Preferir TypeScript para contratos de dados.
- Manter codigo de tarefas em `src/features/tasks/`.
- Manter componentes reutilizaveis fora da feature apenas quando forem realmente genericos.
- Evitar regras de negocio diretamente em componentes visuais.
- Manter validacoes proximas do dominio que validam.
- Atualizar documentacao quando uma decisao mudar.

## Convencoes de nome

Convencoes recomendadas para etapas futuras:

- Componentes React em PascalCase, como `TaskItem.tsx`.
- Hooks com prefixo `use`, como `useTasks.ts`.
- Servicos com nome descritivo, como `taskService.ts`.
- Validadores com nome explicito, como `validateTaskTitle.ts`.
- Tipos principais em `types.ts` dentro da feature quando forem especificos do dominio.

## Seguranca no fluxo de trabalho

Antes de adicionar codigo ou dependencia:

- Verificar se ha necessidade real.
- Revisar impacto de seguranca.
- Evitar dependencias para problemas simples.
- Nao adicionar segredos ao repositorio.
- Validar toda entrada de usuario.
- Renderizar conteudo do usuario como texto.
- Evitar `dangerouslySetInnerHTML`.
- Tratar erros sem expor detalhes internos.

## UX no fluxo de trabalho

Toda etapa que tocar interface deve considerar:

- Clareza dos textos.
- Responsividade.
- Estados vazios.
- Estados de erro.
- Feedback apos acoes importantes.
- Navegacao por teclado.
- Rotulos acessiveis.
- Tamanho adequado de areas clicaveis.

## Qualidade e validacao

Quando os comandos existirem, a validacao minima antes de encerrar uma etapa devera incluir:

- `npm run lint`
- `npm run build`
- `npm run test`, se houver testes configurados

Para mudancas visuais relevantes, tambem devera haver conferencia manual ou automatizada da interface em viewport desktop e mobile.

## Politica de documentacao

Atualizar documentacao quando:

- Uma tecnologia for escolhida ou trocada.
- Uma regra de negocio mudar.
- Um novo fluxo de usuario for definido.
- Um risco de seguranca for identificado.
- Um comando de projeto mudar.
- Uma etapa do roadmap for concluida ou replanejada.

## Proxima etapa recomendada

Apos esta documentacao tecnica, a proxima etapa deve ser uma especificacao curta para inicializar o projeto com Vite, contendo:

- Comando exato.
- Arquivos esperados.
- Dependencias adicionadas.
- Ajustes de estrutura apos o scaffold.
- Validacoes a executar.
- Riscos e plano de reversao.
