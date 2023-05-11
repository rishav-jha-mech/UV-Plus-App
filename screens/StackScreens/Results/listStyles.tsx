import { StyleSheet } from 'react-native';
import { kBlueColor, kPrimaryColor, kRedColor, kSecondaryColor } from '../../constants';


export const listStyles = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: kRedColor,
        flexDirection: 'row',
        marginVertical: 1.0,
        justifyContent: 'space-between',
    },
    TheText: {
        flex: 1,
        textAlign: 'center',
        paddingVertical: 16.0,
        color: '#fff',
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


