import { StyleSheet, Dimensions } from 'react-native';
import { Color } from '../../styles/Color';

const styles = StyleSheet.create({
    card: {
        width: Dimensions.get('screen').width * 0.25,
        backgroundColor: Color.secondary,

        borderRadius: 20,
        margin: Dimensions.get('screen').width * 0.03,

        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        width: Dimensions.get('screen').width * 0.25,
        height: Dimensions.get('screen').width * 0.25,

        top: 0,

        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    contact: {
        fontFamily: 'Nunito_600SemiBold',
        color: Color.white,
        fontSize: 15,
        textAlign: 'center',

        marginLeft: 3,
        marginRight: 3,
        marginTop: 5,
        marginBottom: 10,
    },
})

export default styles