import express from 'express'
import * as socketIo from 'socket.io';
import cors from 'cors'

import routes from './routes'

import './database/connection'

const app = express()

const server = require("http").Server(app)
const io = require("socket.io")(server)

const connectedUsers = <string[]>{}
app.use((req: any, res, next) => {
    req.io = io
    req.connectedUsers = connectedUsers

    // para continuar o fluxo das rotas
    return next()
})
io.on('connection', (socket: any) => {
    const { user_id } = socket.handshake.query
    connectedUsers[user_id] = socket.id
    
    var len = 0
    for (var user in connectedUsers){
        len++
    }
    socket.broadcast.emit('toAll-devices-connect', { message: len})

}, (error: any) => {
    console.log(error)
})

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));
app.use(cors())
app.use(express.json())
app.use(routes)

server.listen(3333)