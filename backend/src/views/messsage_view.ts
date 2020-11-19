import Message from '../models/Message'

export default {
    render(message: Message) {
        return {
            contact_id: message.contact_id,
            contact: message.contact,
            message: message.message,
            time: message.time,
        }
    },

    renderMany(messages: Message[]) {
        return messages.map(message => this.render(message))
    }
}