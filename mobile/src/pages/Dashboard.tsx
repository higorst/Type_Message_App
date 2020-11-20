import React, { useState, useEffect } from 'react'
import { View, Text } from 'react-native'
import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native'

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
// import AsyncStorage from '@react-native-async-storage/async-storage';
import ConversationController from '../controller/ConversationController';
import { Conversation as ConversationModel } from '../models/ConversationModel';
import { Message as MessageModel } from '../models/MessageModel';
import MessageController from '../controller/MessageController';

interface ConversationInterface {
    id: number;
    id_contact: string;
    user_contact: string;
    image_contact: string;
    user_id: string;
    // time: string;
    // n_lidas: number;
    last_message: string;
}

interface MessageInterface {
    id: string;
    message: string;
    sender: boolean;
    time: string;
}

interface UserLogged {
    id: string;
    user: string;
    password: string;
    image: string;
    update: boolean;
    view: string;
}

interface NewMessage {
    // info - who is sending
    id_contact: string;
    user_contact: string;
    image_contact: string;
    // info - who is receiving
    id: string;
    message: string;
    time: string;
}


export default function Dahsboard() {

    const navigation = useNavigation()

    const [conversations, setConversations] = useState<any[]>([])
    const [devices_connect, setDevicesConnect] = useState(0)
    const [loadConversations, setLoadConversations] = useState(false)

    // carregar dados de usuário logado
    const route = useRoute()
    const params = route.params as UserLogged

    const socket = socketio.connect(Constants.baseURL, {
        query: { user_id: params.user },
    })

    socket.on('connect', () => {
        console.log(`Connected with server. [${params.user}]`);
    });

    socket.on('connect_error', (err: any) => {
        console.log(err);
        handlePopup("Falha na conexão com o servidor!\nTente novamente mais tarde!")
    })

    socket.on('devices', (data: any) => {
        setDevicesConnect(data.message)
    })

    socket.on('message', (data: any) => {
        console.log(data.message)
        handleNewMessage(data)
    })



    async function handleNewMessage(data: any) {
        // verificar se existe conversa 
        await ConversationController.findByUser(data.user_contact).then(async (response: any) => {
            if (!(response.length > 0)) {
                await ConversationController.add(new ConversationModel(
                    params.id,
                    data.id_contact,
                    data.user_contact,
                    data.image_contact,
                    params.id,
                ))
            }
            await response._array.map(async (res: any) => {
                // save message
                console.log("add message received")
                // console.log(data)
                await MessageController.add(new MessageModel(
                    0,
                    data.message,
                    false,
                    data.time,
                    params.id,
                    res.id
                ))
            })
            if (!(response.length > 0)) {
                handleLoadConversations()
            }
        })
    }


    const [popup, setPopup] = useState({ visible: false, message: '' })
    function handlePopup(message: string) {
        setPopup({ visible: true, message: message })
    }

    function handleGoToConversation(conversation: ConversationInterface) {
        navigation.navigate("Conversation", {
            id_conversation: conversation.id,
            id_contact: conversation.id_contact,
            user_contact: conversation.user_contact,
            image_contact: conversation.image_contact,
            id: params.id,
            user: params.user,
            password: params.password,
            image: params.image,
        })
    }

    function handleContacts() {
        // contacts
        navigation.navigate("Contacts", {
            id: params.id,
            user: params.user,
            password: params.password,
            image: params.image,
        })
    }

    async function handleLogout() {
        navigation.navigate("Login")
    }

    function handleLoadConversations() {
        // MessageController.lastMessage(id).then( (res: any) => {
        //     // last_message = res.messsage
        //     console.log(res)
        // })
        ConversationController.findAll(params.id)
            .then((response: any) => {
                // console.log(response)
                // var array_conversations = [] as ConversationInterface[]
                // response._array.map((cv: any) => {
                //     // console.log()
                //     let message = ''
                //     MessageController.lastMessage(cv.id).then((res: any) => {
                //         // last_message = res.messsage
                //         res._array.map((msg: any) => {
                //             console.log(msg.message)
                //             message = msg.message
                //         })
                //     })
                //     array_conversations.push({
                //         id: Number(cv.id),
                //         id_contact: String(cv.id_contact),
                //         user_contact: String(cv.user_contact),
                //         image_contact: String(cv.image_contact),
                //         user_id: String(cv.user_id),
                //         last_message: String(message)
                //     })
                // })
                // console.log("conversations")
                // console.log(conversations)
                // setConversations(Object.values(response._array))
                // console.log(Object.values(response._array))
                setConversations(response._array)   

                // setConversations(array_conversations)
                // console.log(array_conversations)

                // console.log(response)
                // response._array.map((r: any) => {
                //     console.log(r.id)
                // })
                // setConversations(response._array)
            })
    }

    useEffect(() => {
        handleLoadConversations()
    }, [params.view])

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
                user_name={`Olá ${params.user}`}
                avatar={params.image}
                // configuration={true} 
                devices_on={devices_connect}
                onContacts={handleContacts}
            />

            <ScrollView style={DashboardStyles.scrollview}>
                {conversations.map(conversation => {
                    // const { id, id_contact, user_contact, image_contact } = conversation
                    let last_msg = ''
                    // await MessageController.lastMessage(id).then( (res: any) => {
                    //     // last_message = res.messsage
                    //     console.log(res)
                    // })

                    // MessageController.lastMessage(conversation.id).then( (res: any) => {
                    //     // last_message = res.messsage
                    //     res._array.map( (msg: any) => {
                    //         console.log(msg.message)
                    //         last_msg = msg.message
                    //     } )
                    // })

                    return (
                        <Conversation
                            onPress={() => handleGoToConversation(conversation)}
                            image={conversation.image_contact}
                            key={conversation.id}
                            id={conversation.id}
                            user={conversation.user_contact}
                            // time={'18:45'}
                            n_lidas={0}
                            // last_message={last_msg}
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