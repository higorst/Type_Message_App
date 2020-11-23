import { Request, Response } from 'express'
import { getRepository } from 'typeorm'
import Message from '../models/Message'
import messageView from '../views/message_view'

import Queue from '../message_queue/lib/Queue'

async function deleteByUser(contact: any) {
    const messageRepository = getRepository(Message)

    const messages = await messageRepository
        .createQueryBuilder("message")
        .delete()
        .where("contact = :contact", { contact })
        .execute()
    return
}

export default {

    async send(request: any, response: Response) {
        const date = new Date()
        let hours = date.getHours().toString()
        let minutes = date.getMinutes().toString()
        hours = hours === '0' ? '00' : hours
        minutes = minutes === '0' ? '00' : minutes
        const time = hours + ":" + minutes
        const { id, user, image, contact_id, contact, message } = request.body

        const connectedUsers = request.connectedUsers
        const user_socket = connectedUsers[contact]
        if (user_socket) {
            await Queue.add('JobSendMessage', {
                user_socket: user_socket,
                // info - who is sending
                id_contact: id,
                user_contact: user,
                image_contact: image,
                // info - who is receiving
                id: contact_id,
                message: message,
                contact: contact,
                time: time
            })
        } else {
            await Queue.add('JobStoreMessage', {
                // info - who is sending
                id_contact: id,
                user_contact: user,
                image_contact: image,
                // info - who is receiving
                id: contact_id,
                message: message,
                contact: contact,
                time: time
            })
        }
        return response.json({ message: "mensagem enviada" })
    },

    async getMessagesFromUser(user: any, io: any, connectedUsers: any) {
        const messageRepository = getRepository(Message)

        const messages = await messageRepository
            .createQueryBuilder("message")
            .where("message.contact = :user", { user })
            .select([
                "id_message",
                "message",
                "user_contact",
                "image_contact",
                "id",
                "message",
                "contact",
                "time",
            ])
            .execute()

        const messages_ = messageView.renderMany(messages)
        const user_socket = connectedUsers[user]
        messages_.map(async message => {
            await Queue.add('JobSendMessage', {
                user_socket: user_socket,
                // info - who is sending
                id_contact: message.id_message,
                user_contact: message.user_contact,
                image_contact: message.image_contact,
                // info - who is receiving
                id: message.id,
                message: message.message,
                contact: message.contact,
                time: message.time
            })
        })
        await deleteByUser(user)
    },
}