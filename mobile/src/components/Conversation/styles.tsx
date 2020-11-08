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
    },
    box_2: {
        height: avatarLenght * 1,
        width: Dimensions.get('screen').width * 0.75 - 10,
        backgroundColor: Color.secondary,

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
        width: Dimensions.get('screen').width * 0.75 - 35,
        flex: 1,

        marginRight: 10,

        justifyContent: 'center',
    },

    user_name: {
        fontFamily: 'Nunito_400Regular_Italic',
        fontStyle: 'italic',
        fontSize: 14,
        color: Color.white,
    },
    number_box: {
        width: 22,
        height: 22,
        borderRadius: 50,
        backgroundColor: Color.primary,

        justifyContent: 'center',
        alignContent: 'center',
    },
    number: {
        fontFamily: 'Nunito_400Regular_Italic',
        fontStyle: 'italic',
        fontWeight: 'bold',
        fontSize: 12,
        color: Color.white,
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
        fontSize: 16,
        color: Color.primary,
        maxWidth: Dimensions.get('window').width - avatarLenght * 1.63,
        maxHeight: 50,
    },











    // avatar_box: {
    //     height: 64,
    //     width: 64,
    //     borderRadius: 100,
    //     left: 10,
    //     elevation: 4,
    // },
    // avatar: {
    //     height: 64,
    //     width: 64,
    //     borderRadius: 100,
    //     position: 'relative',

    //     borderWidth: 1,
    //     borderColor: Color.conversation,
    // },
    
    // context: {
    //     flexDirection: 'column',
    //     width: Dimensions.get('window').width * 0.77,

    //     padding: 5,
    //     paddingLeft: 20,

    //     backgroundColor: Color.conversation,
    //     borderRadius: 20,
    //     marginRight: Dimensions.get('window').width * 0.03,
    //     elevation: 3,
    // },
    // up: {
    //     flexDirection: 'row',
    //     justifyContent: 'space-between',
    //     // padding: 5,
    //     paddingTop: 3,
    //     paddingRight: 3,
    // },
    // down: {
    //     flexDirection: 'row',
    //     justifyContent: 'space-between',
    //     // padding: 5,
    //     paddingTop: 3,
    //     paddingRight: 3,
    //     paddingBottom: 5,
    // },

    // user_name: {
    //     fontFamily: 'Nunito_400Regular_Italic',
    //     fontStyle: 'italic',
    //     fontSize: 14,
    //     color: Color.white,
    // },
})

export default styles