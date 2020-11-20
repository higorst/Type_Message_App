import { Message } from '../models/MessageModel'
import { DatabaseConnection } from '../database/database-connection';

const table = "messages"
const db = DatabaseConnection.getConnection()

export default class MessageController {

    static add(param: Message) {
        return new Promise((resolve, reject) => db.transaction(
            tx => {
                tx.executeSql(
                    `insert into ${table} 
                    (message, sender, time, user_id, conversation_id, time) 
                    values (?, ?, ?, ?, ?, ?)`,
                    [param.message, param.sender, param.time, param.user_id, param.conversation_id, param.time],
                    (_, { insertId, rows }) => {
                        console.log("id message insert: " + insertId);
                        resolve(insertId)
                    }), (sqlError: any) => {
                        console.log(sqlError);
                    }
            }, (txError) => {
                console.log(txError);
            }));
    }

    static deleteById(id: number) {
        db.transaction(
            tx => {
                tx.executeSql(`delete from ${table} where id = ?;`, [id], (_, { rows }) => {
                }), (sqlError: any) => {
                    console.log(sqlError);
                }
            }, (txError) => {
                console.log(txError);

            });
    }



    static lastMessage(id: number) {
        return new Promise((resolve, reject) => db.transaction(tx => {
            tx.executeSql(`select message, time from ${table} where conversation_id=? ORDER BY message DESC LIMIT 1`, [id], (_, { rows }) => {
                resolve(rows)
            }), (sqlError: any) => {
                console.log(sqlError);
            }
        }, (txError) => {
            console.log(txError);

        }));
    }

    static findById(id: number) {
        return new Promise((resolve, reject) => db.transaction(tx => {
            tx.executeSql(`select * from ${table} where conversation_id=?`, [id], (_, { rows }) => {
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