import Contact from '../models/Contact'

export default {
    render(contact: Contact) {
        return {
            id: contact.id,
            user: contact.user,
            password: contact.password,
            image: contact.image,
        }
    },

    renderMany(contacts: Contact[]) {
        return contacts.map(contact => this.render(contact))
    }
}