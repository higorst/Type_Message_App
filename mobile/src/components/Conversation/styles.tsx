import { Dimensions, StyleSheet } from 'react-native'
import { Color } from '../../styles/Color';

const avatarLenght = Dimensions.get('window').width * 0.25

const styles = StyleSheet.create({
    container: {
        height: avatarLenght * 1,
        width: Dimensions.get('window').width,
        marginTop: 5,
        marginBottom: 5,

        borderRadius: 20,
    },
    box_1: {
        height: avatarLenght * 1,
        width: Dimensions.get('screen').width * 0.25,
        backgroundColor: Color.secondary,

        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',

        borderRadius: 100,
        marginLeft: 10,

        borderWidth: 3,
        borderColor: Color.borderHeader,
    },
    box_2: {
        height: avatarLenght * 1,
        width: Dimensions.get('screen').width * 0.75 - 10,
        backgroundColor: Color.conversation,

        justifyContent: 'center',
        alignItems: 'flex-start',
        flexDirection: 'column',

        paddingLeft: 15,
        borderRadius: 20,
        left: Dimensions.get('screen').width * 0.25,
    },

    contact_image: {
        width: Dimensions.get('screen').width * 0.24,
        height: Dimensions.get('screen').width * 0.24,

        borderRadius: 100,
    },

    box_2_row_1: {
        width: Dimensions.get('screen').width * 0.75 - 35,
        height: avatarLenght * 0.35,

        marginRight: 10,

        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    box_2_row_2: {
        flex: 1,

        marginRight: 10,
        marginBottom: 5,
        paddingLeft: 10,

        justifyContent: 'center',
        flexDirection: 'row'
    },
    box_2_row_2_col_1: {
        flex: 1,
        justifyContent: 'center',
    },
    box_2_row_2_col_2: {
        right: 0,
        paddingLeft: 5,
        justifyContent: 'center'
    },

    user_name: {
        fontFamily: 'Nunito_400Regular_Italic',
        fontStyle: 'italic',
        fontSize: 14,
        color: Color.white,
    },
    online: {
        fontFamily: 'Nunito_400Regular_Italic',
        fontStyle: 'italic',
        fontSize: 12,
        color: Color.white,
        textAlign: 'center'
    },
    offline: {
        fontFamily: 'Nunito_400Regular_Italic',
        fontStyle: 'italic',
        fontSize: 12,
        color: Color.primary,
        textAlign: 'center'
    },
    time: {
        fontFamily: 'Nunito_400Regular_Italic',
        fontStyle: 'italic',
        fontSize: 12,
        color: Color.primary,
    },

    message: {
        fontFamily: 'Nunito_600SemiBold',
        // textAlign: 'center',
        fontSize: 16,
        color: Color.white,
        maxWidth: Dimensions.get('window').width - avatarLenght * 1.63,
        maxHeight: 50,
    },
    sender: {
        fontFamily: 'Nunito_600SemiBold',
        fontSize: 12,
        color: Color.primary,
        marginRight: 5,
        maxWidth: Dimensions.get('window').width - avatarLenght * 1.63,
        maxHeight: 50,
    },
})

export default styles