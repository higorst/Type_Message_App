import React from 'react'
import { View, Image, Text, ImageSourcePropType } from 'react-native'
import { BorderlessButton } from 'react-native-gesture-handler'
import { Feather } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native';

import styles from './styles';
import { Color } from '../../styles/Color';

interface HeaderProps {
    user_name: string;
    avatar: string;
    back?: boolean;
    configuration?: boolean;
    delete?: boolean;
    devices_on?: number;

    onPressDelete?: any;
    onPressConfiguration?: any;
    onPressback?: any;
    onContacts?: any;

    online?: boolean;
}

export default function Header(props: HeaderProps) {

    const navigation = useNavigation()

    function handleGoDashboard() {
        navigation.navigate('Dashboard')
    }

    return (
        <View style={styles.container}>
            { props.back ? (
                <BorderlessButton onPress={props.onPressback} >
                    <Feather name="arrow-left" size={24} color={Color.primary} />
                </BorderlessButton>
            ) : null}

            { props.configuration ? (
                <BorderlessButton onPress={props.onPressConfiguration} >
                    <Feather name="sliders" size={24} color={Color.primary} />
                </BorderlessButton>
            ) : null}

            { props.devices_on ? (
                <BorderlessButton style={styles.online} onPress={props.onContacts}>
                    <Feather name="users" size={20} color={Color.primary} />
                    <Text style={styles.devices_online}>{props.devices_on} online</Text>
                </BorderlessButton>
            ) : null}

            <Text style={styles.user_name}>{props.user_name}</Text>

            <View style={styles.image_plus_online}>
                <Image source={{ uri: `data:image/png;base64,${props.avatar}` }} style={styles.avatar} />
                {props.online ? <Text style={styles.online_text}>online</Text> : null}                
            </View>

            { props.delete ? (
                <BorderlessButton onPress={props.onPressDelete} >
                    <Feather name="trash" size={24} color={Color.primary} />
                </BorderlessButton>
            ) : null}
        </View>
    )
}