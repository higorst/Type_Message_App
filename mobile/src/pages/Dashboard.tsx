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

import { connect } from 'react-redux';
import { newMessageRedux } from '../redux/Actions'

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

function Dashboard(props: any) {

    const navigation = useNavigation()

    const [conversations, setConversations] = useState<ConversationInterface[]>([])
    const [devices_connect, setDevicesConnect] = useState(0)
    const [updateCards, setUpdateCards] = useState('')
    const [io, setIO] = useState<SocketIOClient.Socket>()

    // carregar dados de usuário logado
    const route = useRoute()
    const params = route.params as UserLogged

    async function handleNewMessage(data: any) {
        // verificar se existe conversa 
        await ConversationController.findByUser(data.user_contact).then(async (response: any) => {
            if (!(response.length > 0)) {
                console.log("criando nova conversa")
                await ConversationController.add(new ConversationModel(
                    params.id,
                    data.id_contact,
                    data.user_contact,
                    data.image_contact,
                    params.id,
                )).then(async (insertId: any) => {
                    console.log("conversa criada")

                    // save message
                    console.log("add message received")
                    // console.log(data)
                    await MessageController.add(new MessageModel(
                        0,
                        data.message,
                        0,
                        data.time,
                        params.id,
                        insertId
                    )).then((insertId_message: any) => {
                        // send to conversation with redux
                        props.newMessageRedux({
                            id: insertId_message,
                            message: data.message,
                            sender: 0,
                            user_id: params.id,
                            time: data.time,
                            conversation_id: insertId,
                        })
                    })

                })
            } else {
                await response._array.map(async (res: any) => {
                    // save message
                    console.log("add message received")
                    // console.log(data)
                    await MessageController.add(new MessageModel(
                        0,
                        data.message,
                        0,
                        data.time,
                        params.id,
                        res.id
                    )).then((insertId: any) => {
                        // send to conversation with redux
                        props.newMessageRedux({
                            id: insertId,
                            message: data.message,
                            sender: 0,
                            user_id: params.id,
                            time: data.time,
                            conversation_id: res.id,
                        })
                    })
                })
            }
            // if (!(response.length > 0)) {
            handleLoadConversations()
            // }
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
        io?.disconnect()
        navigation.navigate("Login")
    }

    function handleLoadConversations() {
        ConversationController.findAll(params.id)
            .then((response: any) => {
                setConversations(response._array)
            })
    }

    useEffect(() => {

        const socket = socketio.connect(Constants.baseURL, {
            query: { user_id: params.user },
        })

        setIO(socket)

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
    }, [])

    useEffect(() => {
        handleLoadConversations()
        setUpdateCards((new Date()).toString())
    }, [params.view])

    useEffect(() => {
        setUpdateCards((new Date()).toString())
    }, [props.message_redux])

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
                {conversations.map((conversation, index) => {
                    return (
                        <Conversation
                            key={index}
                            onPress={() => handleGoToConversation(conversation)}
                            image={conversation.image_contact}
                            id={conversation.id}
                            user={conversation.user_contact}
                            n_lidas={0}
                            update_cards={updateCards}
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

const mapStateToProps = (state: any) => ({
    message_redux: state.dataAll.message
})

export default connect(
    mapStateToProps,
    { newMessageRedux },
)(Dashboard)