import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const FileDoesNotExist = () => {
    return (
        <View style={Error.Container}>
            <Text style={Error.Text}>
                File Does Not Exist
            </Text>
        </View>
    )
}

export default FileDoesNotExist

const Error = StyleSheet.create({
    Container: {
        // backgroundColor:'#fff',
        backgroundColor: '#6f00ff',
        width: '70%',
        height: '25%',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 8,
        borderRadius: 16
    },
    Text: {
        fontSize: 20,
        // color:'#6f00ff',
        color: '#fff',
        fontWeight: '700',
        fontSize: 26,
        letterSpacing: 0.6,
        textShadowRadius: 3
    }

})

