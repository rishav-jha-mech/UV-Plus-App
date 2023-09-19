import { StyleSheet } from 'react-native';


export const listStyles = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: '#f2f2f2',
        flexDirection: 'row',
        marginVertical: 1.0,
        justifyContent: 'space-between',
    },
    TheText: {
        flex: 1,
        textAlign: 'center',
        paddingVertical: 16.0,
        color: '#444',
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


