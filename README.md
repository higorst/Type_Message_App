# Type
## A app chat mobile with message queue
[![Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)](https://travis-ci.org/joemccann/dillinger)
<!-- [![React](https://simpleicons.org/icons/react.svg)]()
[![AWS](https://simpleicons.org/icons/amazonaws.svg)]()
[![Redis](https://simpleicons.org/icons/redis.svg)]()
[![MySQL](https://simpleicons.org/icons/mysql.svg)]()
[![Docker](https://simpleicons.org/icons/docker.svg)]()
[![SocketIO](https://simpleicons.org/icons/socket-dot-io.svg)]() -->

***

> Higor Santos de Jesus <br>
> Bachelor of Exact and Technological Sciences - UFRB <br>
> Graduating in Computer Engineering - UFRB <br>

- [Overview](#overview)
- [Use App](#app)
- [System Design](#server)

***
#### <a id="overview" />Overview

<div style="text-align:center"><img src="/assets/app.gif" /></div>

Distributed mobile application developed during the Distributed Systems discipline, in the Computer Engineering course. Basically the application is a messaging application between users, from which they can:

- Create an account;
- Consult all available accounts;
- View users online;
- Select a user to chat;

The modeling of the system guarantees:

- Vertical scaling
   - Each server works in cluster mode, which creates an instance for each core of the machine that runs it;
- Horizontal scaling
   - The balancer guarantees the insertion of several instances of the server;
   - Redis guarantees the synchronization of the SocketIO instances in each AWS EC2;
- Data consistency
   - The modeling has a main instance and two secondary replicas;
  
***
#### <a id="app" />Use App

- 1st Option:
  - Install Expo
  - Access: https://expo.io/@higorsj/projects/type
  - Scan the qr-code and use the application
- 2nd Option:
  - Download the apk: https://exp-shell-app-assets.s3.us-west-1.amazonaws.com/android/%40higorsj/type-257b5c7e956c45cd85dd0289de13491c-signed.apk 
  - Install on your smartphone

***
#### <a id="server" />System Design

System structure hosted on Amazon AWS.

- Message Queue
   - Queue for sending messages to online users;
- Store Queue
   - Queue to store messages for offline users;
- Balancer
   - Structure responsible for balancing users between EC2 instances of the server;
- Message Server
   - Server allocated in an AWS EC2 instance;
   - Server for handling the receipt and sending of messages between users;
   - User management;
- RDS
   - Primary: RDS MySQL primary instance;
   - Replica: Replicas of the primary instance to ensure data consistency;
  
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
