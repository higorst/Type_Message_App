import { StyleSheet, Dimensions } from 'react-native';
import { Color } from './Color';

const ContactStyles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',

        backgroundColor: Color.borderHeader,
    },
    safeAreaView: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Color.borderHeader,
    },
    navigator: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',

        width: Dimensions.get('screen').width,

        // position: 'absolute',

        // padding: 20,
        bottom: 0,
        paddingLeft: Dimensions.get('window').width * 0.1,
        paddingRight: Dimensions.get('window').width * 0.1,

        backgroundColor: Color.primary,

        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        elevation: 3,
    },

    scrollview: {
        backgroundColor: Color.white
    },
})

export default ContactStyles