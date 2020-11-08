import React from 'react'
import { View, Image, Text, TouchableOpacity } from 'react-native'

import styles from './styles'

import avatar from '../../assets/images/avatar.jpg'

interface ConversationProps {
    onPress: any;
    avatar: string;
    contact: string;
    time: string;
    n_lidas: number;
    last_message: {
        name_sender: string;
        message: string;
    }
}

export default function Conversation(props: ConversationProps) {
    return (
        <TouchableOpacity
            onPress={props.onPress}
            style={styles.container}>
            <View style={styles.box_2}>

                <View style={styles.box_2_row_1}>
                    <Text style={styles.user_name}>{props.contact}</Text>
                    <View style={styles.number_box}>
                        <Text style={styles.number}>{props.n_lidas}</Text>
                    </View>
                    <Text style={styles.time}>{props.time}</Text>
                </View>
                <View style={styles.box_2_row_2}>
                    <Text style={styles.message}>{props.last_message.message}</Text>
                </View>

            </View>
            <View style={styles.box_1}>
                <Image source={{ uri: `data:image/png;base64,${props.avatar}` }} style={styles.contact_image} />
            </View>
            {/* <View style={styles.avatar_box}>
                <Image source={{ uri: `data:image/png;base64,${props.avatar}` }} style={styles.avatar} /> 
            </View>
            <View style={styles.context}>
                <View style={styles.up}>
                    <Text style={styles.user_name}>{props.contact}</Text>
                    <Text style={styles.time}>{props.time}</Text>
                </View>
                <View style={styles.down}>
                    <Text style={styles.message}>{props.last_message.message}</Text>
                    <View style={styles.number_box}>
                        <Text style={styles.number}>{props.n_lidas}</Text>
                    </View>
                </View>
            </View> */}
        </TouchableOpacity>
    )
}