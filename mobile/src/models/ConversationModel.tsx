export class Conversation {

    constructor(id?: string, id_contact?: string, image_contact?: string, user_id_conversation?: string) {
        this.id = id;
        this.id_contact = id_contact;
        this.image_contact = image_contact;
        this.user_id_conversation = user_id_conversation;
    }

    public id?: string;
    public id_contact?: string;
    public image_contact?: string;
    public user_id_conversation?: string;
}