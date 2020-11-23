const SocketService = require('../../SocketService');

export default {
    key: 'JobSendMessage',
    options: {
        priority: 1,
    },
    async handle(data: any) {
        const {
            user_socket,
            // info - who is sending
            id_contact,
            user_contact,
            image_contact,
            // info - who is receiving
            id,
            message,
            contact,
            time,
        } = data.data

        console.log(`[JobSendMessage]: input message '${message}'`)
        const instance = SocketService.getInstance()
        await instance.to(user_socket).emit('message', {
            // info - who is sending
            id_contact: id_contact,
            user_contact: user_contact,
            image_contact: image_contact,
            // info - who is receiving
            id: id,
            message: message,
            contact: contact,
            time: time,
        })
        console.log(`[JobSendMessage]: output message '${message}' to user '${contact}'`)
    }
}