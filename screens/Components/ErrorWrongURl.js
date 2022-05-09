import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { kPrimaryColor } from '../constants'

const ErrorWrongURl = ({ message }) => {
    return (
        <View style={styles.Container}>
            <View style={styles.Card}>
                <Text style={styles.Text}>
                    {message.includes('500') ? 'Entered URL is not supported' : message.includes('Network Error') ? 'Switch on your Mobile Data or Wifi to use the internet' : message}
                </Text>
            </View>
        </View>
    )
}

export default ErrorWrongURl

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: kPrimaryColor,
        justifyContent: 'center',
        alignItems: 'center',
    },
    Card: {
        backgroundColor: '#fff',
        elevation: 10,
        borderRadius: 16,
        padding: 25,
        minHeight: 150,
    },
    Text: {
        textAlign: 'center',
        fontSize: 24,
        letterSpacing: 0.8,
        fontWeight: '800',
        lineHeight: 40,
        color: '#000'
    }
})
