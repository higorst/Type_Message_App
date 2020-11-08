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
    onPressDelete?: any;
    onPressConfiguration?: any;
}

export default function Header(props: HeaderProps) {

    const navigation = useNavigation()

    function handleGoDashboard() {
        navigation.navigate('Dashboard')
    }

    return (
        <View style={styles.container}>
            { props.back ? (
                <BorderlessButton onPress={navigation.goBack} >
                    <Feather name="arrow-left" size={24} color={Color.secondary} />
                </BorderlessButton>
            ) : null}

            { props.configuration ? (
                <BorderlessButton onPress={props.onPressConfiguration} >
                    <Feather name="sliders" size={24} color={Color.secondary} />
                </BorderlessButton>
            ) : null}

            <Text style={styles.user_name}>{props.user_name}</Text>

            <Image source={{ uri: `data:image/png;base64,${props.avatar}` }} style={styles.avatar} />

            { props.delete ? (
                <BorderlessButton onPress={props.onPressDelete} >
                    <Feather name="trash" size={24} color={Color.secondary} />
                </BorderlessButton>
            ) : null}
        </View>
    )
}