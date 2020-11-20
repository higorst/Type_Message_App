import React, { useState, useEffect } from 'react'
import { View, Text, SafeAreaView, FlatList, ListRenderItem } from 'react-native'
import { useNavigation, useFocusEffect, useRoute } from '@react-navigation/native'

import Modal from 'react-native-modal';

// components
import Header from '../components/Header/Header'
import Contact from '../components/Contact/Contact'

import ContactsStyles from '../styles/ContactsStyles'
import PopupStyles from '../styles/PopupStyles';

import Constants from '../constants/Constants'
import { Color } from '../styles/Color';
import api from '../services/api';

interface Contact {
    id: string;
    user: string;
    image: string;
}

interface UserLogged {
    id: string;
    user: string;
    password: string;
    image: string;
}

export default function Contacts() {

    const navigation = useNavigation()

    const [contacts, setContacts] = useState<Contact[]>([])

    // carregar dados de usuário logado
    const route = useRoute()
    const params = route.params as UserLogged

    const [popup, setPopup] = useState({ visible: false, message: '' })
    function handlePopup(message: string) {
        setPopup({ visible: true, message: message })
    }

    function handleNewConversation(contact: Contact) {
        navigation.navigate("Conversation", {
            id_contact: contact.id,
            user_contact: contact.user,
            image_contact: contact.image,
            id: params.id,
            user: params.user,
            password: params.password,
            image: params.image
        })
    }

    function handleDashboard() {
        navigation.navigate("Dashboard", {
            id: params.id,
            user: params.user,
            password: params.password,
            image: params.image,
            view: 'contacts'
        })
    }

    useFocusEffect(() => {
        api.get('/users').then(response => {
            setContacts(response.data)
        })

    }, [])

    const renderItem = (contact: ListRenderItem<Contact>, index: ListRenderItem<number>) => {
        let item = contact.item
        if (item.user === params.user){
            return <View />
        }
        return (
            <Contact contact={item.user} avatar={item.image} onPress={() => handleNewConversation(item)} />
        )
    }

    return (
        <View style={ContactsStyles.container}>
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

            <Header user_name={`Olá ${params.user}\ntoque para iniciar uma nova conversa`} avatar={params.image} back onPressback={handleDashboard}/>

            <SafeAreaView style={ContactsStyles.safeAreaView} >
                <FlatList
                    data={contacts}
                    contentContainerStyle={{
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                    renderItem={renderItem}
                    numColumns={3}
                    keyExtractor={(contact, index) => index.toString()}
                />
            </SafeAreaView>
        </View>
    )
}