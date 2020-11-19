import React, { useState, useEffect } from 'react'
import { View, Text } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'

import socketio from 'socket.io-client'

import Modal from 'react-native-modal';

// components
import Header from '../components/Header/Header'
import Option from '../components/Option/Option'
import Conversation from '../components/Conversation/Conversation'

import DashboardStyles from '../styles/DashboardStyles'
import { ScrollView } from 'react-native-gesture-handler'
import PopupStyles from '../styles/PopupStyles';

import Constants from '../constants/Constants'
import api from '../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Conversation {
    id: string;
    user: string;
    image: string;
    time: string;
    n_lidas: number;
    last_message: {
        name_sender: string;
        message: string;
    }
}

interface UserLogged {
    id: string;
    user: string;
    password: string;
    image: string;
}

export default function Dahsboard() {
    
    const navigation = useNavigation()
    
    const [conversations, setConversations] = useState<Conversation[]>([])
    const [devices_connect, setDevicesConnect] = useState(0)
    
    // carregar dados de usuário logado
    const route = useRoute()
    const params = route.params as UserLogged
    const { id, user, password, image } = params
    
    const socket = socketio.connect('http://192.168.0.120:3333', {
        query: { user_id: user },
    })
    
    const [popup, setPopup] = useState({ visible: false, message: '' })
    function handlePopup(message: string) {
        setPopup({ visible: true, message: message })
    }

    function handleGoToConversation(conversation: Conversation) {
        navigation.navigate("Conversation", {
            id_contact: conversation.id,
            user_contact: conversation.user,
            image_contact: conversation.image,
            id: id,
            user: user,
            password: password,
            image: image
        })
    }

    function handleContacts() {
        // contacts
        navigation.navigate("Contacts", {
            id: id,
            user: user,
            password: password,
            image: image,
        })
    }

    async function handleLogout() {
        const user_storage = JSON.stringify({
            id: id,
            user: user,
            password: password,
            logged: false,
        })
        await AsyncStorage.setItem("user_storage", user_storage)
        navigation.navigate("Login")
    }


    useEffect(() => {
        socket.on('connect', () => {
            console.log('Connected with server.');
        });

        socket.on('connect_error', (err: any) => {
            console.log(err);
            handlePopup("Falha na conexão com o servidor!\nTente novamente mais tarde!")
        });
        socket.on('toAll-devices-connect', (data: any) => {
            setDevicesConnect(data.message)
        })

        // implementar método de pegar mensagens
        setConversations([
            {
                id: '1',
                contact: 'Mary Santos',
                time: '18:45',
                n_lidas: 10,
                avatar: 'base64',
                last_message: {
                    name_sender: 'John',
                    message: 'Are you there?',
                },
            },
        ])

    }, [])

    return (
        <View style={DashboardStyles.container}>
            <Modal
                isVisible={popup.visible}
                animationIn="fadeInLeft"
                animationOut="fadeOutRight"
                hideModalContentWhileAnimating={false}
                animationInTiming={1000}
                animationOutTiming={500}
                onShow={() => setTimeout(() => setPopup({ visible: false, message: popup.message }), Constants.timeoutPopup)}
            >
                <View style={PopupStyles.container}>
                    <Text>{popup.message}</Text>
                </View>
            </Modal>

            <Header 
                user_name={`Olá ${user}`} 
                avatar={image} 
                // configuration={true} 
                devices_on={devices_connect} 
            />

            <ScrollView style={DashboardStyles.scrollview}>
                {conversations.map(conversation => {
                    return (
                        <Conversation
                            onPress={() => handleGoToConversation(conversation)}
                            avatar={conversation.image}
                            key={conversation.id}
                            contact={conversation.user}
                            time={conversation.time}
                            n_lidas={conversation.n_lidas}
                            last_message={conversation.last_message}
                        />
                    )
                })}
            </ScrollView>

            <View style={DashboardStyles.navigator}>
                <Option type="message" selected />
                <Option type="contact" onPress={handleContacts} />
                <Option type="logout" onPress={handleLogout} />
            </View>
        </View>
    )
}