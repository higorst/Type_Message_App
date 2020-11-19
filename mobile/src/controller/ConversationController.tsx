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
                    (id_contact, image_contact, user_id_conversation) 
                    values (?, ?, ?)`,
                    [param.id_contact, param.image_contact, param.user_id_conversation],
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

    static findById(id: string) {
        return new Promise((resolve, reject) => db.transaction(tx => {
            tx.executeSql(`select * from ${table} where id_contact=?`, [id], (_, { rows }) => {
                resolve(rows)
            }), (sqlError: any) => {
                console.log(sqlError);
            }
        }, (txError) => {
            console.log(txError);

        }));
    }

    static findAll() {
        return new Promise((resolve, reject) => db.transaction(tx => {
            tx.executeSql(`select * from ${table}`, [], (_, { rows }) => {
                resolve(rows)
            }), (sqlError: any) => {
                console.log(sqlError);
            }
        }, (txError) => {
            console.log(txError);
        }))


    }

}