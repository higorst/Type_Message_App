import MessageController from './controllers/MessageController';

let instance: any = null;

var connectedUsers = <string[]>[]
var users_online = <string[]>[]
var users_connected_count = 0

class SocketService {
    static Initialize(server: any) {

        instance = require('socket.io')(server);
        const redisAdapter = require('socket.io-redis');
        instance.adapter(redisAdapter({ host: 'localhost', port: 6379 }));

        instance.on('connection', (socket: any) => {
            const { user_id } = socket.handshake.query
            console.log(`user ${user_id} connected`)

            // do you receive messages when was offline?
            MessageController.getMessagesFromUser(user_id, instance, connectedUsers)

            connectedUsers[user_id] = socket.id
            users_online.push(user_id)
            users_connected_count++

            // socket.on('join', function(room: any){
            //     socket.join(room);

            //     //log other socket.io-id's in the room
            //     instance.adapter.clients([room], (err: any, clients: any) => {
            //             console.log(clients);
            //     });
            // });

            socket.emit('devices', { message: (users_connected_count - 1) })
            socket.broadcast.emit('devices', { message: (users_connected_count - 1) })

            socket.on('disconnect', function () {
                // remove saved socket from users object
                const { user_id } = socket.handshake.query
                console.log(`user ${user_id} disconnected`)

                delete connectedUsers[user_id]
                users_online.splice(users_online.indexOf(user_id), 1)

                users_connected_count--
                socket.broadcast.emit('devices', { message: (users_connected_count - 1) })
            });

        }, (error: any) => {
            console.log(error)
        })

        return instance;
    }

    static getInstance() {
        return instance;
    }
    static get_connectedUsers() {
        return connectedUsers
    }
    static get_users_online() {
        return users_online
    }
    static get_users_connected_count() {
        return users_connected_count
    }
}

module.exports = SocketService;