import { Conversation } from '../models/ConversationModel'
import { DatabaseConnection } from '../database/database-connection';

const table = "conversations"
const db = DatabaseConnection.getConnection()

export default class ConversationController {

    static add(param: Conversation) {
        return new Promise((resolve, reject) => db.transaction(
            tx => {
                tx.executeSql(
                    `insert into ${table} 
                    (id_contact, user_contact, image_contact, user_id) 
                    values (?, ?, ?, ?)`,
                    [param.id_contact, param.user_contact, param.image_contact, param.user_id],
                    (_, { insertId, rows }) => {
                        console.log("id conversation insert: " + insertId);
                        resolve(insertId)
                    }), (sqlError: any) => {
                        console.log(sqlError);
                    }
            }, (txError) => {
                console.log(txError);
            }));
    }

    static deleteById(id: number) {
        return new Promise((resolve, reject) => db.transaction(
            tx => {
                tx.executeSql(
                    // `begin;
                    //  delete from ${table} where id = '${id}'; 
                    //  delete from messages where conversation_id = '${id}';
                    //  commit;`
                     `delete from ${table} where id = ?;`, [id], (_, { rows }) => {
                        resolve(true)
                }), (sqlError: any) => {
                    console.log(sqlError);
                }
            }, (txError) => {
                console.log(txError);

            }))
    }

    static findByUser(user_contact: string) {
        return new Promise((resolve, reject) => db.transaction(tx => {
            tx.executeSql(`select id from ${table} where user_contact=?`, [user_contact], (id, { rows }) => {
                resolve(rows)
            }), (sqlError: any) => {
                console.log(sqlError);
            }
        }, (txError) => {
            console.log(txError);

        }));
    }

    static findAll(user_id: string) {
        return new Promise((resolve, reject) => db.transaction(tx => {
            tx.executeSql(
                `select 
                    id, 
                    id_contact, 
                    user_contact, 
                    image_contact, 
                    user_id 
                from ${table} where user_id=?`, [user_id], (_, { rows }) => {
                resolve(rows)
            }), (sqlError: any) => {
                console.log(sqlError);
                reject([])
            }
        }, (txError) => {
            console.log(txError);
            console.log("aqui")
            reject([])
        }))


    }

}