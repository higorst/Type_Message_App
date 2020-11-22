import { StyleSheet, Dimensions } from 'react-native';
import { Color } from './Color';

const ConversationStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Color.borderHeader
    },

    scrollview: {
        flex: 1,
        width: Dimensions.get('screen').width
    },

    input_group: {
        bottom: 5,
        // marginTop: 10,
        margin: 10,
        width: Dimensions.get('screen').width - 20,
        height: 50,
        padding: 5,

        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    input: {
        flex: 1,
        marginRight: 15,

        backgroundColor: Color.primary,
        color: Color.white,

        borderRadius: 20,
        height: 50,
        // paddingVertical: 18,
        // paddingHorizontal: 24,
        padding: 15,

        textAlignVertical: 'center',
        textAlign: 'justify',

        fontFamily: 'Nunito_600SemiBold',

        elevation: 3,
    },

    button_sender: {
        width: 50,
        height: 50,
        borderRadius: 50,

        alignContent: 'center',

        backgroundColor: Color.primary,
        justifyContent: 'center',
        alignItems: 'center',

        elevation: 3,
    },
})

export default ConversationStyles