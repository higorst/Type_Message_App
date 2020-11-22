import React, { useState, useEffect } from 'react';
import { Image, KeyboardAvoidingView, Text, View, Keyboard, StatusBar } from 'react-native';
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

import UserController from '../controller/UserController';
import { User } from '../models/UserModel'
import api from '../services/api';

export default function Login() {

    const navigation = useNavigation()

    const [id, setId] = useState('')
    const [image, setImage] = useState('')
    const [user, setUser] = useState('')
    const [password, setPassword] = useState('')

    const [popup, setPopup] = useState({ visible: false, message: '' })
    function handlePopup(message: string) {
        setPopup({ visible: true, message: message })
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
            quality: 0.5,
            mediaTypes: ImagePicker.MediaTypeOptions.Images
        })
        if (result.cancelled) {
            return
        }

        const { base64: image } = result
        setImage(image ? image : '')
    }

    async function handleAddAcount() {
        let res = false
        await api.post('/users/verify', { user: user }).then(response => {
            res = response.data.res
            setId(response.data.id)
        })
        .then(async response => {
            if (res) {
                handlePopup("Já existe esse usuário!\nEscolha outro nome.")
            } else if (id && user && password && image) {
    
                // armazenar primeiro no servidor
                await api.post('/users/create', {
                    id: id,
                    user: user,
                    password: password,
                    image: image,
                })
                .then(async response => {
                    await UserController.add(new User(
                        id,
                        user,
                        password,
                        image,
                    ))
                    handlePopup("Usuário criado com sucesso!")
                })
                .catch(response => {
                    handlePopup("Sem conexão com a rede!")
                })
    
                Keyboard.dismiss()
            } else {
                handlePopup("Dados incompletos!")
            }
        })
        .catch(response => {
            handlePopup("Sem conexão com a rede!")
            return
        })
    }

    async function handleLogin() {
        Keyboard.dismiss()
        await UserController.handleLogin(user, password).then(async (res: any) => {
            if (res.length > 0) {
                // aprovado para login
                await res._array.map((item: any) => {
                    setId(item.id)
                    setImage(item.image)
                })
                // navigate to dashboard
                navigation.navigate("Dashboard", {
                    id: id,
                    user: user,
                    password: password,
                    image: image,
                    view: 'login'
                })
                
            } else {
                await api.post('/users/login', {
                    user: user,
                    password: password
                })
                .then((response: any) => {

                    if (response.data.id === '') {
                        handlePopup("Dados não conferem!")
                    } else {

                        navigation.navigate("Dashboard", {
                            id: response.data.id,
                            user: response.data.user,
                            password: response.data.password,
                            image: response.data.image,
                            view: 'login'
                        })
                    }
                })
                .catch(response => {
                    handlePopup("Sem conexão com a rede!")
                    return
                })
            }
        })
    }

    useEffect(() => {
    })

    return (
        <KeyboardAvoidingView style={LoginStyles.container} behavior="position" enabled>

            <StatusBar
                backgroundColor={Color.secondary}
                barStyle="light-content"
                translucent
                animated
            />

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
                    <Text style={PopupStyles.message}>{popup.message}</Text>
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
                    autoCapitalize={"none"}
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                />
                <View style={LoginStyles.button_group}>
                    <TouchableOpacity style={LoginStyles.loginButton} onPress={handleLogin}>
                        <Text style={LoginStyles.login}>Entrar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={LoginStyles.addButton} onPress={handleAddAcount}>
                        <Text style={LoginStyles.add}>Cadastrar</Text>
                    </TouchableOpacity>
                </View>
            </View>

        </KeyboardAvoidingView>
    )
}