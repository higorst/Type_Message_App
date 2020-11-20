import express from 'express'
import * as socketIo from 'socket.io';
import cors from 'cors'

import routes from './routes'

import './database/connection'

const app = express()

const server = require("http").Server(app)
const io = require("socket.io")(server)

var connectedUsers = <string[]>[]
var users_connected_count = 0
app.use((req: any, res, next) => {
    req.io = io
    req.connectedUsers = connectedUsers
    req.users_connected_count = users_connected_count

    // para continuar o fluxo das rotas
    return next()
})
io.on('connection', (socket: any) => {
    const { user_id } = socket.handshake.query
    console.log(`user ${user_id} connected`)
    connectedUsers[user_id] = socket.id
    users_connected_count ++

    socket.emit('devices', { message: (users_connected_count - 1) })
    socket.broadcast.emit('devices', { message: (users_connected_count - 1) })

    socket.on('disconnect', function () {
        // remove saved socket from users object
        const { user_id } = socket.handshake.query
        console.log(`user ${user_id} disconnected`)
        
        delete connectedUsers[user_id]

        users_connected_count--
        socket.broadcast.emit('devices', { message: (users_connected_count - 1) })
    });

}, (error: any) => {
    console.log(error)
})

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb' }));
app.use(cors())
app.use(express.json())
app.use(routes)

server.listen(3333)