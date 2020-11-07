import React, { useState } from 'react';
import { Image, Text, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker'


import LoginStyles from '../styles/LoginStyles'

import logo from '../assets/icon.png'
import { RectButton, TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';
import { Color } from '../styles/Color';
import { useNavigation } from '@react-navigation/native';

export default function Login() {

    const navigation = useNavigation()

    const [image, setImage] = useState('')

    function handleLogin(){
        // login
        navigation.navigate("Dashboard", { user: 'Jhon'})
    }

    async function handleSelectImage() {
        const { status } = await ImagePicker.requestCameraRollPermissionsAsync()

        if (status !== 'granted') {
            alert('Precisamos de acesso as fotos!')
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            quality: 1,
            mediaTypes: ImagePicker.MediaTypeOptions.Images
        })
        if (result.cancelled) {
            return
        }

        const { uri: image } = result
        setImage(image)
    }

    function handleAddAcount() {
        // add acount
    }

    return(
        <View style={LoginStyles.container}>
            <View style={LoginStyles.logo_box}>
                <Image source={logo} style={LoginStyles.logo}/>
            </View>

            <View style={LoginStyles.input_box} >                
                { image ? (
                    <Image
                        key={image}
                        source={{ uri: image }}
                        style={LoginStyles.uploadedImage}
                    />
                ) : (
                    <TouchableOpacity style={LoginStyles.imagesInput} onPress={handleSelectImage}>
                        <Feather name="plus" size={24} color={Color.secondary} />
                    </TouchableOpacity>
                )}
                <TextInput
                    style={LoginStyles.input}
                    // value={opening_hours}
                    // onChangeText={setOpeningHours}
                />
                <View style={LoginStyles.button_group}>
                    <RectButton style={LoginStyles.loginButton} onPress={handleLogin}>
                        <Text style={LoginStyles.login}>Login</Text>
                    </RectButton>
                    <RectButton style={LoginStyles.addButton} onPress={handleAddAcount}>
                        <Text style={LoginStyles.add}>Cadastrar</Text>
                    </RectButton>
                </View>
            </View>

        </View>
    )
}
