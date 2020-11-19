import { StyleSheet } from "react-native";
import { Color } from './Color';

const PopupStyles = StyleSheet.create({
    container: {
        backgroundColor: Color.secondary,
        width: 200,
        borderRadius: 10,
        padding: 10,

        position: 'absolute',
        bottom: 50,
        elevation: 5,
        
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
    },
    message: {
        textAlign:'center',
        fontSize: 16,
        fontFamily: 'Nunito_700Bold',
        color: Color.white,
    },
})

export default PopupStyles