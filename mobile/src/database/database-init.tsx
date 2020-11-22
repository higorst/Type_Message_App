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
    // `DROP TABLE IF EXISTS users;`,
    // `DROP TABLE IF EXISTS conversations;`,
    // `DROP TABLE IF EXISTS messages;`,
        // foreign key (user_id) references users (id),
        // foreign key (conversation_id) references conversations (id)
        // foreign key (user_id) references users (id)
    private InitDb() {
        var sql = [

            `create table if not exists users (
                id text primary key,
                user text,
                password text,
                image text
            );`,

            `create table if not exists conversations (
                id integer primary key autoincrement,
                id_contact text,
                user_contact text,
                image_contact text,
                user_id text,
                user_id_user_contact text UNIQUE
            );`,
                
            `create table if not exists messages (
                id integer primary key autoincrement,
                message text,
                sender integer,
                user_id text,
                time text,
                conversation_id integer
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
