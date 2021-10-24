import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import WebView from 'react-native-webview'

const Web = ( { route } ) => {

    const navigation = useNavigation();
    const { urlToMedia } = route.params;

    return (
        <WebView 
        source = {{uri : urlToMedia}}
        style={styles.Container}
        javaScriptEnabled={true}
        />
    )
}

export default Web

const styles = StyleSheet.create({
    Container:{
        flex:1
    }
})
