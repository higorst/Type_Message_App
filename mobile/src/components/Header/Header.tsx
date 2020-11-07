import React from 'react'
import { View, Image, Text, ImageSourcePropType } from 'react-native'
import { BorderlessButton } from 'react-native-gesture-handler'
import { Feather } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native';

import styles from './styles';
import { Color } from '../../styles/Color';

interface HeaderProps {
    user_name: string;
    avatar: ImageSourcePropType;
    back?: boolean;
    logout?: boolean;
}

export default function Header(props: HeaderProps) {

    const navigation = useNavigation()

    function handleGoDashboard() {
        navigation.navigate('Dashboard')
    }

    function handleLogout() {
        // logout
    }

    return (
        <View style={styles.container}>
            { props.back ? (
                <BorderlessButton onPress={navigation.goBack} >
                    <Feather name="arrow-left" size={24} color="#15b6d6" />
                </BorderlessButton>
            ) : null}

            <Image source={props.avatar} style={styles.avatar} />

            <Text style={styles.user_name}>{props.user_name}</Text>

            { props.logout ? (
                <BorderlessButton onPress={handleLogout} >
                    <Feather name="log-out" size={24} color={Color.secondary} />
                </BorderlessButton>
            ) : null}
        </View>
    )
}