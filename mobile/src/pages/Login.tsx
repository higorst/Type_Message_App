import React, { useState, useEffect } from 'react';
import { Image, KeyboardAvoidingView, Text, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker'
import Modal from 'react-native-modal'

import LoginStyles from '../styles/LoginStyles'

import logo from '../assets/icon.png'
import { RectButton, TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';
import { Color } from '../styles/Color';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

import PopupStyles from '../styles/PopupStyles'

import Constants from '../constants/Constants'


export default function Login() {

    const navigation = useNavigation()

    const [id, setId] = useState('')
    const [image, setImage] = useState('')
    const [user, setUser] = useState('')
    const [password, setPassword] = useState('')
    
    const [popup, setPopup] = useState({ visible: false, message: ''})
    function handlePopup(message: string) {
        setPopup({ visible: true, message: message})
    }

    function handleLogin() {
        setId('1')
        // if (id && user && password && image) {
        if (false) {
        } else {
            navigation.navigate("Dashboard", {
                id: id,
                user: user,
                password: password,
                image: image,
            })
        }
    }

    async function handleSelectImage() {
        const { status } = await ImagePicker.requestCameraRollPermissionsAsync()

        if (status !== 'granted') {
            alert('Precisamos de acesso as fotos!')
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            base64: true,
            aspect: [1, 1],
            quality: 1,
            mediaTypes: ImagePicker.MediaTypeOptions.Images
        })
        if (result.cancelled) {
            return
        }

        const { base64: image } = result
        setImage(image ? image : '')
    }

    function handleAddAcount() {
        // add acount
    }

    return (
        <KeyboardAvoidingView style={LoginStyles.container} behavior="position" enabled>
            <Modal 
                isVisible={popup.visible}
                animationIn="bounceIn"
                animationOut="bounceOut"
                hideModalContentWhileAnimating={false}
                animationInTiming={1000}
                animationOutTiming={500}
                onShow={() => setTimeout( () => setPopup({ visible: false, message: popup.message}), Constants.timeoutPopup)}
            >
                <View style={PopupStyles.container}>
                    <Text>{popup.message}</Text>
                </View>
            </Modal>

            <View style={LoginStyles.logo_box}>
                <Image source={logo} style={LoginStyles.logo} />
            </View>

            <View style={LoginStyles.input_box} >
                {image ? (
                    <TouchableOpacity onPress={handleSelectImage}>
                        <Image
                            key={image}
                            source={{ uri: `data:image/png;base64,${image}` }}
                            style={LoginStyles.uploadedImage}
                        />
                    </TouchableOpacity>
                ) : (
                        <View>
                            <Text style={LoginStyles.subtitle}>Avatar</Text>
                            <TouchableOpacity style={LoginStyles.imageInput} onPress={handleSelectImage}>
                                <Feather name="plus" size={24} color={Color.secondary} />
                            </TouchableOpacity>
                        </View>
                    )}
                <Text style={LoginStyles.subtitle}>Usuário</Text>
                <TextInput
                    style={LoginStyles.input}
                    textContentType={"jobTitle"}
                    value={user}
                    onChangeText={setUser}
                />
                <Text style={LoginStyles.subtitle}>Senha</Text>
                <TextInput
                    style={LoginStyles.input}
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                />
                <View style={LoginStyles.button_group}>
                    <RectButton style={LoginStyles.loginButton} onPress={handleLogin}>
                        <Text style={LoginStyles.login}>Entrar</Text>
                    </RectButton>
                    <RectButton style={LoginStyles.addButton} onPress={handleAddAcount}>
                        <Text style={LoginStyles.add}>Cadastrar</Text>
                    </RectButton>
                </View>
            </View>

        </KeyboardAvoidingView>
    )
}