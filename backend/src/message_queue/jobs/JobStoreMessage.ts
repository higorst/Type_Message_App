import { getRepository } from 'typeorm'
import Message from '../../models/Message'
import * as Yup from 'yup'

export default {
    key: 'JobStoreMessage',
    options: {
        priority: 2,
        attempts: 3,
    },
    async handle(data: any) {
        const {
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

        console.log(`[JobStoreMessage]: input message '${message}'`)
        const messageRepository = getRepository(Message)

        const data_store = {
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

        await schema.validate(data_store, {
            abortEarly: false
        })

        const message_ = messageRepository.create(data_store)

        await messageRepository.save(message_)
        
        console.log(`[JobStoreMessage]: output message '${message}'`)
        console.log(`[JobStoreMessage]: save on database message '${message}'`)
    }
}