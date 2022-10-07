import { StyleSheet } from 'react-native';
import { kPrimaryColor, kSecondaryColor } from '../../constants';


export const listStyles = StyleSheet.create({
    Container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 1.0
    },
    TheText: {
        flex: 1,
        backgroundColor: kSecondaryColor,
        textAlign: 'center',
        paddingVertical: 16.0,
        color: kPrimaryColor,
        fontWeight: '700'
    },
    format: {
        textTransform: 'capitalize',
    },
    nf: {
        color: '#fff',
        backgroundColor: 'orangered',
        textAlign: 'center',
        paddingVertical: 10,
        fontWeight: '700'
    }
})


