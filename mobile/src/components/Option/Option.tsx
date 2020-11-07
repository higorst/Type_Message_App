import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';

import styles from './styles';
import { Color } from '../../styles/Color';

interface OptionProps {
    type: string;
    onPress?: any;
    selected?: boolean
}

export default function Header(props: OptionProps) {
    return (
        <TouchableOpacity style={styles.container} onPress={props.onPress}>
            <Feather
                name={
                    props.type === "message" ? "message-square" :
                    props.type === "contact" ? "plus-square" :
                    "sliders"
                }
                size={24}
                color={props.selected ? Color.secondary : Color.white}
            />
        </TouchableOpacity>
    )
}

// message-square
// plus-square