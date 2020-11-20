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

    static deleteById(id: string) {
        db.transaction(
            tx => {
                tx.executeSql(`delete from ${table} where id_contact = ?;`, [id], (_, { rows }) => {
                }), (sqlError: any) => {
                    console.log(sqlError);
                }
            }, (txError) => {
                console.log(txError);

            });
    }

    static findByUser(user_contact: string) {
        return new Promise((resolve, reject) => db.transaction(tx => {
            tx.executeSql(`select id from ${table} where user_contact=?`, [user_contact], (_, { rows }) => {
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