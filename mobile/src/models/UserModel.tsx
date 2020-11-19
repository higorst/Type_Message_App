export class User {

    constructor(id?: string, user?: string, password?: string, image?: string) {
        this.id = id;
        this.user = user;
        this.password = password;
        this.image = image;
    }

    public id?: string;
    public user?: string;
    public password?: string;
    public image?: string;
}