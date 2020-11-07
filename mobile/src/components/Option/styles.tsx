import { StyleSheet, Dimensions } from 'react-native';
import { Color } from '../../styles/Color';

const styles = StyleSheet.create({
    container: {
        height: 50,

        justifyContent: 'center',
        alignItems: 'center',
        
        // width: Dimensions.get('window').width * 0.4,
    },
    title: {
        fontFamily: 'Nunito_600SemiBold',
        fontSize: 16
    }
})

export default styles