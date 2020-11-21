import Message from '../models/Message'

export default {
    render(message: Message) {
        return {
            id_message: message.id_message,
            id_contact: message.id_contact,
            user_contact: message.user_contact,
            image_contact: message.image_contact,
            id: message.id,
            message: message.message,
            contact: message.contact,
            time: message.time,
        }
    },

    renderMany(messages: Message[]) {
        return messages.map(message => this.render(message))
    }
}