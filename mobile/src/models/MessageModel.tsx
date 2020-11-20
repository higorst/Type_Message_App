export class Message {

    constructor(id?: number, message?: string, sender?: boolean, time?: string, user_id?: string, conversation_id?: number) {
        this.id = id;
        this.message = message;
        this.sender = sender;
        this.time = time;
        this.user_id = user_id;
        this.conversation_id = conversation_id
    }

    public id?: number;
    public message?: string;
    public sender?: boolean;
    public time?: string;
    public user_id?: string;
    public conversation_id?: number;
}