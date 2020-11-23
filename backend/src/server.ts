import 'dotenv/config'
import './database/connection'
import './queue'

import routes from './routes'

// import express from 'express'
import cors from 'cors'

// --------------------------
// import Queue from './message_queue/lib/Queue'
// import JobSendMessage from './message_queue/jobs/JobSendMessage'

// Queue.process(JobSendMessage.handle)
// --------------------------


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

server.listen(process.env.PORT || 3000)
// --------------------------

// const app = express()

// const server = require("http").Server(app)
// const io = require("socket.io")(server)

// var connectedUsers = <string[]>[]
// var users_online = <string[]>[]
// var users_connected_count = 0
// app.use((req: any, res, next) => {
//     req.io = io
//     req.connectedUsers = connectedUsers
//     req.users_connected_count = users_connected_count
//     req.users_online = users_online

//     // para continuar o fluxo das rotas
//     return next()
// })
// io.on('connection', (socket: any) => {
//     const { user_id } = socket.handshake.query
//     console.log(`user ${user_id} connected`)

//     // do you receive messages when was offline?
//     MessageController.getMessagesFromUser(user_id, io, connectedUsers)

//     connectedUsers[user_id] = socket.id
//     users_online.push(user_id)
//     users_connected_count ++

//     socket.emit('devices', { message: (users_connected_count - 1) })
//     socket.broadcast.emit('devices', { message: (users_connected_count - 1) })

//     socket.on('disconnect', function () {
//         // remove saved socket from users object
//         const { user_id } = socket.handshake.query
//         console.log(`user ${user_id} disconnected`)

//         delete connectedUsers[user_id]
//         users_online.splice(users_online.indexOf(user_id), 1)

//         users_connected_count--
//         socket.broadcast.emit('devices', { message: (users_connected_count - 1) })
//     });

// }, (error: any) => {
//     console.log(error)
// })

// app.use(express.json({ limit: '50mb' }));
// app.use(cors())
// app.use(routes)

// server.listen(process.env.PORT || 3000)