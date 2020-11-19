import { StyleSheet, Dimensions } from 'react-native';
import { Color } from './Color';

const LoginStyles = StyleSheet.create({
    container: {
        flex: 1,
    },
    input_box: {
        backgroundColor: Color.primary,
        width: Dimensions.get('screen').width,
        height: Dimensions.get('screen').height * 0.68,

        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,

        top: Dimensions.get('screen').height * 0.32,
        
        // paddingTop: Dimensions.get('screen').height * 0.15,
        // paddingBottom: Dimensions.get('screen').height * 0.15,

        // justifyContent: 'space-between',
        justifyContent: 'center',
        alignItems: 'center',
    },

    logo_box: {
        elevation: 3,
        top: Dimensions.get('screen').height * 0.2,
    },
    logo: {
        width: Dimensions.get('screen').height * 0.2,
        height: Dimensions.get('screen').height * 0.2,

        alignSelf: 'center',
        position: 'absolute',
    },

    input: {
        backgroundColor: Color.white,
        borderWidth: 1.4,
        borderColor: Color.borderHeader,
        borderRadius: 20,
        height: 56,
        width: Dimensions.get('screen').width * 0.6,
        paddingVertical: 18,
        paddingHorizontal: 24,

        textAlignVertical: 'center',
        textAlign: 'center',
        fontFamily: 'Nunito_700Bold',
        color: Color.primary,

        marginBottom: 20,
    },

    button_group: {
        flexDirection: 'row',
    },
    loginButton: {
        backgroundColor: Color.secondary,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        height: 56,
        width: Dimensions.get('screen').width * 0.28,
        marginRight: Dimensions.get('screen').width * 0.01,

        marginBottom: 20,
    },
    addButton: {
        backgroundColor: Color.white,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        height: 56,
        width: Dimensions.get('screen').width * 0.28,
        marginLeft: Dimensions.get('screen').width * 0.01,

        marginBottom: 20,
    },

    login: {
        fontFamily: 'Nunito_800ExtraBold',
        fontSize: 16,
        color: Color.white,
    },

    add: {
        fontFamily: 'Nunito_800ExtraBold',
        fontSize: 16,
        color: Color.secondary,
    },

    imageInput: {
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        borderStyle: 'dashed',
        borderColor: Color.secondary,
        borderWidth: 1.4,
        borderRadius: 20,
        height: 80,
        width: 80,
        justifyContent: 'center',
        alignItems: 'center',

        marginBottom: 20,
        marginTop: 15,
    },

    uploadedImage: {
        borderRadius: 20,
        height: 80,
        width: 80,

        marginBottom: 20,
        marginTop: 15,
    },

    subtitle: {
        color: Color.white,
        fontFamily: 'Nunito_800ExtraBold',
        fontSize: 14,
        textAlign: 'center',
    }
})

export default LoginStyles