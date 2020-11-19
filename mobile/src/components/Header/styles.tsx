import { Dimensions, StyleSheet } from 'react-native';
import { Color } from '../../styles/Color';

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: Color.backgroundHeader,
        borderBottomWidth: 1,
        borderColor: Color.borderHeader,
        paddingTop: 45,
        paddingBottom: 10,

        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    user_name: {
        fontFamily: 'Nunito_600SemiBold',
        color: Color.gray_ton,
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
        color: Color.gray_ton,
        fontSize: 12,
        maxWidth: Dimensions.get('screen').width * 0.5,
        textAlign: 'center'
    }
})


export default styles