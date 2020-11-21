import { Request, Response } from 'express'
import { getRepository } from 'typeorm'
import Message from '../models/Message'
import messageView from '../views/messsage_view'
import * as Yup from 'yup'

async function create(message_to_save: Message) {
    const {
        id_contact,
        user_contact,
        image_contact,
        // info - who is receiving
        id,
        message,
        contact,
        time,
    } = message_to_save

    const messageRepository = getRepository(Message)

    const data = {
        id_contact,
        user_contact,
        image_contact,
        // info - who is receiving
        id,
        message,
        contact,
        time,
    }

    const schema = Yup.object().shape({
        id_contact: Yup.string().required(),
        user_contact: Yup.string().required(),
        image_contact: Yup.string().required(),
        id: Yup.string().required(),
        message: Yup.string().required(),
        contact: Yup.string().required(),
        time: Yup.string().required(),
    })

    await schema.validate(data, {
        abortEarly: false
    })

    const message_ = messageRepository.create(data)

    await messageRepository.save(message_)

    console.log("mensagem salva")
    return { message: "mensagem salva" }
}

export default {

    async send(request: any, response: Response) {
        const date = new Date()
        const time = date.getHours().toString() + ":" + date.getMinutes().toString()
        const { id, user, image, contact_id, contact, message } = request.body

        const user_socket = request.connectedUsers[contact]
        if (user_socket) {
            // enviar mensagem pq usuário está online
            console.log("--- DESTINÁRIO ENCONTRADO")
            request.io.to(user_socket).emit('message', {
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
            console.log("mensagem enviada")
        } else {
            // armazenar no banco pq usuário está offline
            console.log("--- DESTINÁRIO NÃO ENCONTRADO")
            return response.json(create(
                {
                    id_message: 0,
                    // info - who is sending
                    id_contact: id,
                    user_contact: user,
                    image_contact: image,
                    // info - who is receiving
                    id: contact_id,
                    message: message,
                    contact: contact,
                    time: time
                }
            ))


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
            io.to(user_socket).emit('message', message)
        })
    },


    async deleteByIdUser(request: Request, response: Response) {
        const { id } = request.params
        const messageRepository = getRepository(Message)

        const messages = await messageRepository
            .createQueryBuilder("message")
            .delete()
            .where("message.id_contact = :id", { id })
            .execute()

        return response.json({ message: true })
    },
}