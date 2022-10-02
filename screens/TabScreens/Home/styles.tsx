import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 12.0,
        marginBottom: 10.0,
    },
    header: {
        fontSize: 17.0,
        fontWeight: '700',
        color: '#333'
    },
    card: {
        height: 150,
        width: 140,
        backgroundColor: '#fff',
        marginHorizontal: 8.0,
        marginVertical: 20.0,
        elevation: 4.0,
        paddingHorizontal: 6.0,
        paddingVertical: 10.0,
        borderRadius: 10.0,
    },
    cardFileName: {
        fontSize: 12.0,
        lineHeight: 18.0,
        height: '40%',
    },
    iconContainer: {
        height: '60%',
        marginBottom: 10.0,
        justifyContent: 'center',
        alignItems: 'center'
    },
    heading: {
        fontWeight: '600',
        fontSize: 19.0,
        lineHeight: 25.0,
        textAlign: 'center'
    },
    none: {
        paddingVertical: 24.0,
        height: 100.0,
        textAlign: 'center',
    },
    static: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 100,
        width: 80,
        borderRadius: 16,
        marginHorizontal: 7,
        marginVertical: 20
    }
})

export default styles