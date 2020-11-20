import React from 'react'
import { Text, View } from 'react-native'

import styles from './styles'

interface MessageProps {
    sender: number;
    message: string;
    contact: string;
    time: string;
}

export default function Message(props: MessageProps) {
    return (
        <View style={
            props.sender ? styles.sender : styles.receiver
        }>
            <Text style={styles.contact}>{props.contact}</Text>
            <Text style={props.sender === 1 ? styles.message_sender : styles.message}>{props.message}</Text>
        </View>
    )
}