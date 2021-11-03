import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import WebView from 'react-native-webview'

const PlainWeb = ({ route }) => {

    const URL = route.params.url

    return (
        <WebView
            source={{ uri: URL }}
            style={styles.Container}
            allowsFullscreenVideo={true}
        />
    )
}

export default PlainWeb

const styles = StyleSheet.create({
    Container: {
        flex: 1
    }
})
