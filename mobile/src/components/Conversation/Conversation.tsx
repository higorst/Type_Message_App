import React, { useEffect, useState } from 'react'
import { View, Image, Text, TouchableOpacity } from 'react-native'
import MessageController from '../../controller/MessageController'

import styles from './styles'

interface ConversationProps {
    onPress: any;
    id: number;
    image: string;
    user: string;
    n_lidas?: number;
    update_cards: string;
    online?: boolean
}

export default function Conversation(props: ConversationProps) {
    const [last_msg, setLastMsg] = useState('')
    const [time, setTime] = useState('')
    const [sender, setSender] = useState('')

    useEffect(() => {
        MessageController.lastMessage(props.id).then((res: any) => {
            // last_message = res.messsage
            res._array.map((msg: any) => {
                // console.log(msg.message)
                setLastMsg(msg.message)
                setTime(msg.time)
                setSender(
                    msg.sender === 1 ? "Você:" : props.user + ":"
                )
            })
        })
    }, [props.update_cards])

    return (
        <TouchableOpacity
            onPress={props.onPress}
            style={styles.container}>

            <View style={styles.box_2}>

                <View style={styles.box_2_row_1}>
                    <Text style={styles.user_name}>{props.user}</Text>
                    <Text style={styles.time}>{time}</Text>
                </View>

                <View style={styles.box_2_row_2}>
                    <View style={styles.box_2_row_2_col_1}>
                        <Text style={styles.sender}>{sender}</Text>
                        <Text style={styles.message}>{last_msg}</Text>
                    </View>

                    <View style={styles.box_2_row_2_col_2}>
                        <Text style={props.online ? styles.online : styles.offline}>{props.online ? 'online' : 'offline'}</Text>
                    </View>
                </View>

            </View>

            <View style={styles.box_1}>
                <Image source={{ uri: `data:image/png;base64,${props.image}` }} style={styles.contact_image} />
            </View>

        </TouchableOpacity>
    )
}