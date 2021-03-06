import 'dotenv/config'
import './database/connection'
import './queue'

import routes from './routes'

import cors from 'cors'

const cluster = require('cluster');

const { NODE_INSTANCE } = process.env
const port = 3000 + parseInt(NODE_INSTANCE ? NODE_INSTANCE : '0')

const express = require('express');
const http = require('http');
const SocketService = require('./SocketService');

const app = express();
const server = http.Server(app);

app.set('socketService', SocketService.Initialize(server));

app.use((req: any, res: any, next: any) => {
    req.io = SocketService.getInstance()
    res.SocketService = SocketService
    req.connectedUsers = SocketService.get_connectedUsers()
    req.users_connected_count = SocketService.get_users_connected_count()
    req.users_online = SocketService.get_users_online()

    // para continuar o fluxo das rotas
    return next()
})

app.use(express.json({ limit: '50mb' }));
app.use(cors())
app.use(routes)

if (cluster.isMaster) {
    console.log(`[SERVER]: Master ${process.pid} is running`);

    cluster.on('exit', (worker: any, code: any, signal: any) => {
      console.log(`[SERVER]: worker ${worker.process.pid} died`);
    });

  } else {
    // Workers can share any TCP connection
    // In this case it is an HTTP server
    server.listen(port);  
    console.log(`[SERVER]: Worker ${process.pid} started at port ${port}`);
  }