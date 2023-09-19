import React, { createRef, useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Colors } from '../constants';

type ErrorWrongURlProps = {
    message: string
}

const ErrorWrongURl: React.FC<ErrorWrongURlProps> = ({ message }) => {

    return (
        <View style={styles.Container}>
            <View style={styles.Card}>
                <Text>
                    {

                        message.includes('500') ?
                            `Error occured ${message}` :
                            'Network Error'
                    }

                </Text>
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
        backgroundColor: Colors.RedColor,
        justifyContent: 'center',
        alignItems: 'center',
    },
    Card: {
        borderRadius: 8,
        padding: 16,
        margin: 10,
        alignItems: 'center'
    },
    Text: {
        textAlign: 'center',
        fontSize: 24,
        letterSpacing: 0.8,
        fontWeight: '700',
        lineHeight: 32,
        color: Colors.DarkTextColor
    }
})
