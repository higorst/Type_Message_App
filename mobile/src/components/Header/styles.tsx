import { Dimensions, StyleSheet } from 'react-native';
import { Color } from '../../styles/Color';

const styles = StyleSheet.create({
    container: {
        padding: 20,
        paddingTop: 50,
        // backgroundColor: Color.backgroundHeader,
        backgroundColor: Color.secondary,
        // borderBottomWidth: 1,
        borderColor: Color.borderHeader,

        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',

        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
    },
    user_name: {
        fontFamily: 'Nunito_600SemiBold',
        // color: Color.gray_ton,
        color: Color.white,
        fontSize: 16,
        maxWidth: Dimensions.get('screen').width * 0.5,
        textAlign: 'center'
    },
    avatar: {
        width: 64,
        height: 64,
        borderRadius: 100,
    },

    online: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    devices_online: {
        fontFamily: 'Nunito_600SemiBold',
        // color: Color.gray_ton,
        color: Color.white,
        fontSize: 12,
        maxWidth: Dimensions.get('screen').width * 0.5,
        textAlign: 'center'
    }
})


export default styles