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

interface Message {
    id: string;
    message: string;
    sender: boolean;
    time: string;
}

interface ContactProps {
    id: string;
    user: string;
    image: string;
    id_contact: string;
    user_contact: string;
    image_contact: string;
}

export default function Conversation(props: ContactProps) {

    const navigation = useNavigation()

    const [messages, setMessages] = useState<Message[]>([])
    const [lastMessage, setLastMessage] = useState('')
    const [scroll, setScroll] = useState<ScrollView>()

    const routes = useRoute()
    const params = routes.params as ContactProps
    const { id, user, image, id_contact, user_contact, image_contact } = params

    function handleSendMessage() {
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
        setLastMessage('')
        scroll?.scrollTo({x: 0, y: 0, animated: true});
    }

    function handleDeleteConversation(){
        ConversationController.deleteById(id_contact)
        Keyboard.dismiss()
        navigation.goBack()
    }

    function handleScroll(x: number, y:number){
        scroll?.scrollTo({y: y, animated: true});
    }

    useEffect(() => {
        // verificar se existe conversa cadastrada. Se não houver -> cadastrar
        ConversationController.findById(id_contact).then( (response: any) => {
            if (response.length === 0){
                // add conversation
                const user_id_conversation = id
                ConversationController.add( new ConversationModel(
                    id,
                    id_contact,
                    image_contact,
                    user_id_conversation,
                ))
            }
            setMessages([
              {
                  id: '1',
                  message: 'Hi, how are you doing?',
                  sender: false,
                  time: '18:45',
              },
              {
                  id: '2',
                  message: 'Hi, i\'m fine and you?',
                  sender: true,
                  time: '18:45',
              },
              {
                  id: '3',
                  message: 'Im fine too.\n I love to type on this app!',
                  sender: false,
                  time: '18:45',
              },
              {
                  id: '4',
                  message: 'So do I\n\nGod bless you.',
                  sender: true,
                  time: '18:45',
              },
              {
                  id: '5',
                  message: 'Good bye my friend!',
                  sender: false,
                  time: '18:45',
              },
            ])
        })
      // implementar método de pegar mensagens com determinado usuário (id)
    }, [])

    return(
        <KeyboardAvoidingView style={ConversationStyles.container}>
            <Header user_name={user_contact} avatar={image_contact} onPressDelete={handleDeleteConversation} delete back />

            <ScrollView 
                ref={ref => setScroll(ref ? ref : scroll)}
                onContentSizeChange={(x, y) => handleScroll(x, y)}
                
            >
                { messages.map( message => {
                    return(
                        <Message 
                            key={message.id}
                            sender={message.sender} 
                            contact={message.sender ? "Você" : user_contact}
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