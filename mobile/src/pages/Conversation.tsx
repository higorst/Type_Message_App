import React, { useState, useEffect } from 'react'
import { View, KeyboardAvoidingView, TextInput, TouchableOpacity, Keyboard } from 'react-native'

import { useNavigation, useFocusEffect, useRoute } from '@react-navigation/native';

import Header from '../components/Header/Header'
import Message from '../components/Message/Message'

import ConversationStyles from '../styles/ConversationStyles'
import { ScrollView } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';
import { Color } from '../styles/Color';
import ConversationController from '../controller/ConversationController';
import { Conversation as ConversationModel } from '../models/ConversationModel';
import api from '../services/api';
import MessageController from '../controller/MessageController';
import { Message as MessageModel } from '../models/MessageModel';

interface MessageInterface {
    id: string;
    message: string;
    sender: boolean;
    time: string;
}

interface ContactProps {
    id: string;
    user: string;
    password: string;
    image: string;
    id_contact: string;
    user_contact: string;
    image_contact: string;
    id_conversation: number;
}

export default function Conversation(props: ContactProps) {

    const navigation = useNavigation()

    const [idConversation, setIdConversation] = useState(0)
    const [messages, setMessages] = useState<MessageInterface[]>([])
    const [lastMessage, setLastMessage] = useState('')
    const [scroll, setScroll] = useState<ScrollView>()

    const routes = useRoute()
    const params = routes.params as ContactProps

    async function handleSendMessage() {
        if (lastMessage === ''){
            return
        }
        let current_time = new Date()
        setMessages([...messages, {
            id: '1' + current_time,
            message: lastMessage,
            sender: true,
            time: current_time.getHours() + ':' + current_time.getMinutes(),
        },])
        await api.post('messages/send', { 
            id: params.id, 
            user: params.user, 
            image: params.image, 
            contact_id: params.id_contact, 
            contact: params.user_contact, 
            message: lastMessage
        })
        // save message
        console.log("add sended message")
        MessageController.add(new MessageModel(
            0,
            lastMessage,
            true,
            current_time.getHours().toString() + ":" + current_time.getMinutes().toString(),
            params.id,    
            idConversation                    
        ))
        setLastMessage('')
        scroll?.scrollTo({x: 0, y: 0, animated: true});
    }

    function handleDeleteConversation(){
        ConversationController.deleteById(params.id_contact)
        Keyboard.dismiss()
        navigation.navigate('Dashboard', {
            id: params.id,
            user: params.user,
            password: params.password,
            image: params.image,
            view: 'delete_conversation'
        })
    }

    function handleToDashboard(){
        Keyboard.dismiss()
        navigation.navigate('Dashboard', {
            id: params.id,
            user: params.user,
            password: params.password,
            image: params.image,
            view: 'conversation'
        })
    }

    function handleScroll(x: number, y:number){
        scroll?.scrollTo({y: y, animated: true});
    }

    useEffect(() => {
        // setMessages([
        //   {
        //       id: '1',
        //       message: 'Hi, how are you doing?',
        //       sender: false,
        //       time: '18:45',
        //   },
        // ])

        // para quando vim da dashboard
        if (params.id_conversation) {
            MessageController.findById(params.id_conversation).then((response: any) => {
                // console.log("messages --------")
                // console.log(response)
                // console.log(idConversation)
                setMessages(response._array)
            })
        // para quando selecionar um novo contato
        } else {            
            // verificar se existe conversa cadastrada. Se não houver -> cadastrar
            ConversationController.findByUser(params.user_contact).then( async (response: any) => {
                if (response.length === 0){
                    // add conversation
                    const user_id = params.id
                    await ConversationController.add( new ConversationModel(
                        params.id,
                        params.id_contact,
                        params.user_contact,
                        params.image_contact,
                        user_id,
                    )).then( (id: any) => {
                        setIdConversation(id)
                    })
                }else {
                    response._array.map((data: any) => {
                        // console.log(data.id)
                        setIdConversation(data.id)
                    })
                }
                // get messages
                MessageController.findById(idConversation).then((response: any) => {
                    // console.log("messages --------")
                    // console.log(response)
                    console.log(idConversation)
                    setMessages(response._array)
                })
            })
        }

      // implementar método de pegar mensagens com determinado usuário (id)
    }, [])

    useEffect(() => {
        scroll?.scrollTo({x: 0, y: 0, animated: true});
        console.log("update messages")
    }, [lastMessage])

    return(
        <KeyboardAvoidingView style={ConversationStyles.container}>
            <Header 
                user_name={params.user_contact} 
                avatar={params.image_contact} 
                onPressDelete={handleDeleteConversation} 
                onPressback={handleToDashboard} delete back 
            />

            <ScrollView 
                ref={ref => setScroll(ref ? ref : scroll)}
                onContentSizeChange={(x, y) => handleScroll(x, y)}
                
            >
                { messages.map( message => {
                    return(
                        <Message 
                            key={message.id}
                            sender={message.sender} 
                            contact={message.sender ? "Você" : params.user_contact}
                            message={message.message}
                            time={message.time}
                        />
                    )
                }) }
            </ScrollView>

            <View style={ConversationStyles.input_group}>
                <TextInput 
                    style={ConversationStyles.input}
                    value={lastMessage}
                    multiline
                    onChangeText={setLastMessage} 
                />
                <TouchableOpacity onPress={handleSendMessage} style={ConversationStyles.button_sender}>
                    <Feather name="send" size={24} color={Color.primary}/>
                </TouchableOpacity>
            </View>

        </KeyboardAvoidingView>
    )
}