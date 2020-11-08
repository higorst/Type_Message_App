import React from 'react'
import { TouchableOpacity, Image, Text } from 'react-native';

import styles from './styles'

interface ContactProps {
    avatar: string;
    contact: string;
}

export default function Contact(props: ContactProps) {
    return(
        <TouchableOpacity style={styles.card}>
            <Image source={{ uri: `data:image/png;base64,${props.avatar}` }} style={styles.avatar} />
            <Text style={styles.contact}>{props.contact}</Text>
        </TouchableOpacity>
    )
}