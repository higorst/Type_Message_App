import { Request, Response } from 'express'
import { getRepository } from 'typeorm'
import Message from '../models/Message'
import messageView from '../views/messsage_view'
import * as Yup from 'yup'

export default {
    
    async send(request: any, response: Response){
        const date = new Date()
        const time = date.getHours().toString() + ":" + date.getMinutes().toString()
        const { id, user, image, contact_id, contact, message } = request.body

        const user_socket = request.connectedUsers[contact]
        if (user_socket){
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
        } else {
            // armazenar no banco pq usuário está offline
            console.log("--- DESTINÁRIO NÃO ENCONTRADO")
        }
        return response.json({message: "mensagem enviada"})
    },

    async getMessagesFromUser(request: Request, response: Response){
        const { id } = request.params
        const messageRepository = getRepository(Message)

        const messages = await messageRepository
            .createQueryBuilder("message")
            .where("message.contact_id = :id", {id})
            .select(["message.contact_id", "message.contact", "message.message", "message.time"])
            .execute()

        return response.json(messageView.renderMany(messages))
    },


    async deleteByIdUser(request: Request, response: Response){
        const { id } = request.params
        const messageRepository = getRepository(Message)

        const messages = await messageRepository
            .createQueryBuilder("message")
            .delete()
            .where("message.contact_id = :id", {id})
            .execute()

        return response.json({message: true})
    },

    async create(request: Request, response: Response) {
        const {
            contact_id,
            contact,
            message,
            time,
        } = request.body
    
        const messageRepository = getRepository(Message)

        const data = {
            contact_id,
            contact,
            message,
            time,
        }

        const schema  = Yup.object().shape({
            contact_id: Yup.string().required(),
            contact: Yup.string().required(),
            message: Yup.string().required(),
            time: Yup.string().required(),
        })

        await schema.validate(data, {
            abortEarly: false
        })
    
        const message_ = messageRepository.create(data)
    
        await messageRepository.save(message_)
    
        return response.status(201).json(message_)
    }
}