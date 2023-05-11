import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const Permission: React.FC = () => {
    return (
        <View style={Errors.Container}>
            <Text style={Errors.TheText}>Read Permission Not Given</Text>
            <Text style={Errors.TheText}>You Can't View Files</Text>
            <Text style={Errors.TheText}>Try Enabling Storage Permission in Settings or</Text>
            <Text style={Errors.TheText}>Try Reinstalling The App</Text>
        </View>
    )
}

export default Permission

const Errors = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
    },
    TheText: {
        fontSize: 22,
        fontWeight: '700',
        textAlign: 'center',
        textTransform: 'capitalize',
        lineHeight: 40
    }
})