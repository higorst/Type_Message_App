import { Dimensions, StyleSheet } from 'react-native'
import { Color } from '../../styles/Color';

const styles = StyleSheet.create({
    sender: {
        width: Dimensions.get('window').width * 0.7 - 10,
        paddingLeft: 20,
        paddingRight: 20,
        paddingBottom: 10,
        elevation: 3,

        borderRadius: 20,
        marginTop: 5,
        marginBottom: 5,

        // sender
        marginLeft: Dimensions.get('window').width * 0.3,
        marginRight: 5,
        // backgroundColor: '#80b6ff'
        backgroundColor: Color.primary
    },
    receiver: {
        width: Dimensions.get('window').width * 0.7 - 10,
        paddingLeft: 20,
        paddingRight: 20,
        paddingBottom: 10,
        elevation: 3,

        borderRadius: 20,
        marginTop: 5,
        marginBottom: 5,

        // receiver
        marginRight: Dimensions.get('window').width * 0.3,
        marginLeft: 5,
        backgroundColor: Color.white
    },

    fail: {
        width: Dimensions.get('window').width * 0.7 - 10,
        paddingLeft: 20,
        paddingRight: 20,
        paddingBottom: 10,
        elevation: 3,

        borderRadius: 20,
        marginTop: 5,
        marginBottom: 5,

        // sender
        marginLeft: Dimensions.get('window').width * 0.3,
        marginRight: 5,
        // backgroundColor: '#80b6ff'
        backgroundColor: Color.primary,
        opacity: 0.5
    },

    message_fail: {
        fontFamily: 'Nunito_600SemiBold',
        fontSize: 14,
        color: Color.secondary,
        marginTop: 5,
    },

    message: {
        fontFamily: 'Nunito_600SemiBold',
        fontSize: 14,
        color: Color.primary
    },

    message_sender: {
        fontFamily: 'Nunito_600SemiBold',
        fontSize: 14,
        color: Color.white,
    },

    contact: {
        fontFamily: 'Nunito_400Regular_Italic',
        fontStyle: 'italic',
        fontSize: 12,
        marginBottom: 5,
        marginTop: 5,
        color: Color.secondary
    },
})

export default styles