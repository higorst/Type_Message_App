import React, { useState } from 'react'
import { View } from 'react-native'

import { useNavigation, useFocusEffect } from '@react-navigation/native';

interface Message {
    id: string;
    message: string;
    sender: boolean;
}

interface ContactProps {
    id: string;
}

export default function Conversations(props: ContactProps) {

    const navigation = useNavigation()

    const [messages, setMessages] = useState<Message[]>([])

    useFocusEffect(() => {
      // implementar método de pegar mensagens com determinado usuário (id)
      setMessages([
        {
            id: '1',
            message: 'Hi, how are you doing?',
            sender: false,
        },
        {
            id: '2',
            message: 'Hi, i\'m fine and you?',
            sender: true,
        },
        {
            id: '3',
            message: 'Im fine too.\n I love to type on this app!',
            sender: false,
        },
        {
            id: '4',
            message: 'So do I\n\nGod bless you.',
            sender: true,
        },
        {
            id: '5',
            message: 'Good bye my friend!',
            sender: false,
        },
      ])
    }, [])

    return(
        <View />
    )
}