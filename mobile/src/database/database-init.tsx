import { DatabaseConnection } from './database-connection'

var db: any = null
export default class DatabaseInit {

    constructor() {
        db = DatabaseConnection.getConnection()
        db.exec([{ sql: 'PRAGMA foreign_keys = ON;', args: [] }], false, () =>
            console.log('Foreign keys turned on')
        );
        this.InitDb()
    }
    private InitDb() {
        var sql = [
            // `DROP TABLE IF EXISTS users;`,
            // `DROP TABLE IF EXISTS conversations;`,
            // `DROP TABLE IF EXISTS messages;`,

            `create table if not exists users (
                id text,
                user text,
                password text,
                image text
            );`,

            `create table if not exists conversations (
                id integer primary key autoincrement,
                contact_id text,
                contact_avatar text,
                user_id_conversation text,
                foreign key (user_id_conversation) references users (id) ON DELETE CASCADE
            );`,

            `create table if not exists messages (
                id integer primary key autoincrement,
                message text,
                sender integer,
                user_id text,
                conversation_id integer,
                foreign key (user_id) references users (id) ON DELETE CASCADE,
                foreign key (conversation_id) references conversations (id) ON DELETE CASCADE
            );`,
        ];
        // sender => 1: true -/- 0: false

        // `insert into gato(nome) values('preto');`,
        // `insert into gato(nome) values('cinza');`,
        // `insert into cachorro (nome) values('vira lata');`,
        // `insert into cachorro (nome) values('salsicha');`

        db.transaction(
            (tx: any) => {
                for (var i = 0; i < sql.length; i++) {
                    console.log("execute sql : " + sql[i]);
                    tx.executeSql(sql[i]);
                }
                console.log("database init completed!")
            }, (error: any) => {
                console.log("error call back : " + JSON.stringify(error));
                console.log(error);
            }, () => {
                console.log("transaction complete call back ");
            }
        );
    }

}
