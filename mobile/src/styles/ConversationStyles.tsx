import { StyleSheet, Dimensions } from 'react-native';
import { Color } from './Color';

const ConversationStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Color.secondary
    },

    input_group: {
        bottom: 5,
        marginTop: 10,
        width: Dimensions.get('screen').width,
        height: 50,
        padding: 5,

        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    input: {
        width: Dimensions.get('screen').width * 0.8,

        backgroundColor: Color.backgroundHeader,
        borderRadius: 20,
        height: 50,
        paddingVertical: 18,
        paddingHorizontal: 24,
        textAlignVertical: 'center',
        textAlign: 'justify',

        elevation: 3,
    },

    button_sender: {
        width: 50,
        height: 50,
        borderRadius: 50,

        backgroundColor: Color.backgroundHeader,
        justifyContent: 'center',
        alignItems: 'center',

        elevation: 3,
    },
})

export default ConversationStyles