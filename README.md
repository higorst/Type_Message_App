# Type
## A app chat mobile with message queue
[![Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)](https://travis-ci.org/joemccann/dillinger)
[![React](https://simpleicons.org/icons/react.svg)]()
[![AWS](https://simpleicons.org/icons/amazonaws.svg)]()
[![Redis](https://simpleicons.org/icons/redis.svg)]()
[![MySQL](https://simpleicons.org/icons/mysql.svg)]()
[![Docker](https://simpleicons.org/icons/docker.svg)]()
[![SocketIO](https://simpleicons.org/icons/socket-dot-io.svg)]()

***

> Higor Santos de Jesus <br>
> Bachelor of Exact and Technological Sciences - UFRB <br>
> Graduating in Computer Engineering - UFRB <br>

- [Overview](#overview)
- [System Design](#server)
- [Client](#client)
- [Package Sending and Receiving](#packages)
- [Multi-Thread Implementation](#multithread)
- [Cache Implementation](#cache)
- [File Access](#file)
- [Results](#results)
- [Dependencies](#dependecies)

***
#### <a id="overview" />Overview

Aplicação móvel distribuída desenvolvida durante a disciplina de Sistemas Distribuídos, no curso de Engenharia de Computação. Basicamente a aplicação é um aplicativo de mensagens entre usuários, do quais podem:

- Criar uma conta;
- Consultar todas as contas disponíveis;
- Visualizar os usuários online;
- Selecionar um usuário para conversar;

A modelagem do sistema garante:

- Escalonamento vertical
  - Cada servidor funciona em modo cluster, que cria uma instância para cada núcleo da máquina que o executa;
- Escalonamento horizontal
  - O balanceador garante a inserção de várias instâncias do servidor;
  - O Redis garante a sincronia das instâncias do SocketIO em cada EC2 da AWS;
- Consistência de dados
  - A modelagem possui uma instância principal e duas réplicas secundárias;
  
***
#### <a id="server" />System Design
[![AWS](https://simpleicons.org/icons/amazonaws.svg)]()

Estrutura do sistema hospedado na Amazon AWS.

- Message Queue
  - Fila de envio de mensagens a usuários online;
- Store Queue
  - Fila para armazenamento de mensagens destinadas a usuários offline;
- Balancer
  - Estrutura responsável pelo balanceamento dos usuários entre as instâncias EC2 do servidor;
- Message Server
  - Servidor alocado em uma instância EC2 da AWS;
  - Servidor para tratamento do recebimento e envio das mensagens entre usuários;
  - Gerenciamento de usuários;
- RDS
  - Primary: Instância primário do RDS MySQL;
  - Replica: Réplicas da instância primária para garantir a consistência de dados;
  
<div style="text-align:center"><img src="/assets/design.png" /></div>

***
[MIT License](https://choosealicense.com/licenses/mit/)


[//]: # (These are reference links used in the body of this note and get stripped out when the markdown processor does its job. There is no need to format nicely because it shouldn't be seen. Thanks SO - http://stackoverflow.com/questions/4823468/store-comments-in-markdown-syntax)


   [dill]: <https://github.com/joemccann/dillinger>
   [git-repo-url]: <https://github.com/joemccann/dillinger.git>
   [john gruber]: <http://daringfireball.net>
   [df1]: <http://daringfireball.net/projects/markdown/>
   [markdown-it]: <https://github.com/markdown-it/markdown-it>
   [Ace Editor]: <http://ace.ajax.org>
   [node.js]: <http://nodejs.org>
   [Twitter Bootstrap]: <http://twitter.github.com/bootstrap/>
   [jQuery]: <http://jquery.com>
   [@tjholowaychuk]: <http://twitter.com/tjholowaychuk>
   [express]: <http://expressjs.com>
   [AngularJS]: <http://angularjs.org>
   [Gulp]: <http://gulpjs.com>

   [PlDb]: <https://github.com/joemccann/dillinger/tree/master/plugins/dropbox/README.md>
   [PlGh]: <https://github.com/joemccann/dillinger/tree/master/plugins/github/README.md>
   [PlGd]: <https://github.com/joemccann/dillinger/tree/master/plugins/googledrive/README.md>
   [PlOd]: <https://github.com/joemccann/dillinger/tree/master/plugins/onedrive/README.md>
   [PlMe]: <https://github.com/joemccann/dillinger/tree/master/plugins/medium/README.md>
   [PlGa]: <https://github.com/RahulHP/dillinger/blob/master/plugins/googleanalytics/README.md>
