import React, { useState, useEffect } from 'react'
import { View, Text } from 'react-native'

import { useNavigation, useFocusEffect } from '@react-navigation/native'

// components
import Header from '../components/Header/Header'
import Option from '../components/Option/Option'
import Conversation from '../components/Conversation/Conversation';

import avatar from '../assets/images/avatar.jpeg'

import DashboardStyles from '../styles/DashboardStyles'
import { ScrollView } from 'react-native-gesture-handler'

interface Conversation {
    id: string;
    contact: string;
    last_message: {
        name_sender: string;
        message: string;
    }
}

export default function Conversations() {

    const navigation = useNavigation()

    const [conversations, setConversations] = useState<Conversation[]>([])

    function handleChangeOption(option: string) {
        console.log(option)
    }

    useEffect(() => {
      // implementar método de pegar mensagens
      setConversations([
        {
            id: '1',
            contact: 'Jhon',
            last_message: {
                name_sender: 'John',
                message: 'Are you there?',
            },
        },
        {
            id: '2',
            contact: 'Jhon',
            last_message: {
                name_sender: 'John',
                message: 'Are you there?',
            },
        },
        {
            id: '3',
            contact: 'Jhon',
            last_message: {
                name_sender: 'John',
                message: 'Are you there?',
            },
        },
        {
            id: '4',
            contact: 'Jhon',
            last_message: {
                name_sender: 'John',
                message: 'Are you there?',
            },
        },
        {
            id: '5',
            contact: 'Jhon',
            last_message: {
                name_sender: 'John',
                message: 'Are you there?',
            },
        },
        {
            id: '6',
            contact: 'Jhon',
            last_message: {
                name_sender: 'John',
                message: 'Are you there?',
            },
        },
        {
            id: '7',
            contact: 'Jhon',
            last_message: {
                name_sender: 'John',
                message: 'Are you there?',
            },
        },
        {
            id: '8',
            contact: 'Jhon',
            last_message: {
                name_sender: 'John',
                message: 'Are you there?',
            },
        },
        {
            id: '9',
            contact: 'Jhon',
            last_message: {
                name_sender: 'John',
                message: 'Are you there?',
            },
        },
        {
            id: '10',
            contact: 'Jhon',
            last_message: {
                name_sender: 'John',
                message: 'Are you there?',
            },
        },
        {
            id: '11',
            contact: 'Jhon',
            last_message: {
                name_sender: 'John',
                message: 'Are you there?',
            },
        },
        {
            id: '12',
            contact: 'Jhon',
            last_message: {
                name_sender: 'John',
                message: 'Are you there?',
            },
        },
        {
            id: '13',
            contact: 'Jhon',
            last_message: {
                name_sender: 'John',
                message: 'Are you there?',
            },
        },
        {
            id: '15',
            contact: 'Jhon',
            last_message: {
                name_sender: 'John',
                message: 'Are you there?',
            },
        },
      ])
    }, [])

    return(
        <View style={DashboardStyles.container}>
            <Header user_name="Olá Jhon" avatar={avatar} logout={true} />

            <ScrollView style={DashboardStyles.scrollview}>
                { conversations.map(conversation => {
                    return(
                        <Conversation 
                            key={conversation.id} 
                        />
                    )
                }) }
            </ScrollView>

            <View style={DashboardStyles.navigator}>
                <Option type="message" selected onPress={() => handleChangeOption("Conversas")}/>
                <Option type="contact" onPress={() => handleChangeOption("Contatos")}/>
                <Option type="logout" onPress={() => handleChangeOption("Logout")}/>
            </View>
        </View>
    )
}