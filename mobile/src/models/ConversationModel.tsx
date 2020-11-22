export class Conversation {

    constructor(id: string, id_contact: string, user_contact: string, image_contact: string, user_id: string) {
        this.id = id;
        this.id_contact = id_contact;
        this.user_contact = user_contact;
        this.image_contact = image_contact;
        this.user_id = user_id;
    }

    public id: string;
    public id_contact: string;
    public user_contact: string;
    public image_contact: string;
    public user_id: string;
}