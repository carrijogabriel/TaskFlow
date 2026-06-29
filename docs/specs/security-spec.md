# Especificacao de Seguranca

## Objetivo

Registrar cuidados de seguranca desde o inicio, mesmo em uma aplicacao simples de tarefas.

## Validacao de entrada

- Todo dado informado pelo usuario deve ser validado antes de ser aceito.
- Titulo deve ser obrigatorio.
- Campos de texto devem ter limite maximo de caracteres.
- Entradas devem ser normalizadas quando fizer sentido, como remocao de espacos nas extremidades.
- Status e identificadores nao devem aceitar valores arbitrarios.

## Prevencao contra XSS

- Textos informados pelo usuario devem ser exibidos como texto, nao como HTML executavel.
- A interface nao deve usar insercao direta de HTML com conteudo do usuario.
- Caso algum conteudo rico seja permitido no futuro, sera necessario sanitizar de forma explicita e documentada.

## Dados exibidos na tela

- Exibir apenas os dados necessarios para a tarefa.
- Evitar mostrar mensagens tecnicas, rastros de erro ou detalhes internos.
- Nao registrar em console informacoes sensiveis caso o projeto evolua para usuarios reais.

## Exclusao acidental

- Exclusao deve ter mecanismo de protecao.
- Uma decisao futura devera escolher entre confirmacao, lixeira, soft delete ou desfazer temporario.
- Enquanto nao houver mecanismo de recuperacao, a interface deve deixar claro que a acao remove a tarefa.

## Tratamento seguro de erros

- Erros esperados devem ser tratados com mensagens claras.
- Erros internos nao devem vazar detalhes de implementacao.
- Falhas de validacao devem indicar o campo ou acao afetada.
- O sistema deve manter estado consistente apos falhas.

## Segredos e variaveis sensiveis

- Nao adicionar tokens, senhas, chaves ou credenciais no repositorio.
- Se variaveis de ambiente forem necessarias no futuro, documentar nomes esperados sem valores reais.
- Arquivos locais de segredo devem ser ignorados pelo controle de versao.

## Dependencias

- Evitar dependencias desnecessarias.
- Justificar bibliotecas adicionadas.
- Preferir dependencias mantidas, conhecidas e com proposito claro.
- Revisar riscos de seguranca antes de adicionar pacotes.

## Cuidados futuros

Caso o projeto inclua autenticacao, banco de dados, usuarios reais ou API publica, sera necessario revisar:

- Controle de acesso.
- Autorizacao por usuario.
- Protecao contra CSRF, quando aplicavel.
- Rate limiting, quando aplicavel.
- Politicas de CORS.
- Criptografia em transito.
- Backups e retencao de dados.
- Logs sem dados sensiveis.

## Criterios de aceitacao de seguranca

- Conteudo digitado pelo usuario nao executa scripts.
- Entradas invalidas sao recusadas com mensagem clara.
- Nao existem segredos no codigo.
- A exclusao possui protecao contra acidente.
- Erros nao expoem detalhes internos.
