import React from 'react'
import { Text, View, StyleSheet, Image } from 'react-native'

import logo from '../assets/images/logo.png'

import Message from '../components/Message/Message';

export default function Info() {
    return (
        <View style={styles.container}>
            {/* <Text>Type Message</Text> */}
            <Image source={logo} style={styles.logo}/>
            <Message
                sender={true} 
                message="Hi. How are you doing?"
                contact="John"
            />
            <Message
                sender={false} 
                message="I'm so good, and you?"
                contact="John"
            />
            <Message
                sender={true} 
                message="Nice. I want to go to your home."
                contact="John"
            />
            <Message
                sender={false} 
                message="Come on now .."
                contact="John"
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center'
    },
    logo: {
        width: 144,
        height: 147,
    }
})