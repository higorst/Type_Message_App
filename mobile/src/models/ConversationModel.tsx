export class Conversation {

    constructor(id?: string, contact_id?: string, contact_avatar?: string, user_id_conversation?: string) {
        this.id = id;
        this.contact_id = contact_id;
        this.contact_avatar = contact_avatar;
        this.user_id_conversation = user_id_conversation;
    }

    public id?: string;
    public contact_id?: string;
    public contact_avatar?: string;
    public user_id_conversation?: string;
}