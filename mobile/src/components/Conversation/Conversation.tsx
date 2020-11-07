import React from 'react'
import { View, Image, Text } from 'react-native'

import styles from './styles'

import avatar from '../../assets/images/avatar.jpg'

export default function Conversation() {
    return (
        <View style={styles.container}>
            <View style={styles.avatar_box}>
                <Image source={avatar} style={styles.avatar} /> 
            </View>
            <View style={styles.context}>
                <View style={styles.up}>
                    <Text style={styles.user_name}>Mary</Text>
                    <Text style={styles.time}>18:45</Text>
                </View>
                <View style={styles.down}>
                    <Text style={styles.message}>Hello John. How are you doing?</Text>
                    <View style={styles.number_box}>
                        <Text style={styles.number}>10</Text>
                    </View>
                </View>
            </View>
        </View>
    )
}