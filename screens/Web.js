import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import WebView from 'react-native-webview'
import { useNavigation } from '@react-navigation/native';

const Web = ( { route } ) => {

    const navigation = useNavigation();
    const { urlToMedia } = route.params;

    return (
        <WebView 
        source = {{uri : urlToMedia}}
        style={styles.Container}
        javaScriptEnabled={true}
        allowsFullscreenVideo={true}
        onLoadStart={() => console.log("Loading Started")}
        onLoadEnd={() => console.log("Completed Loaded")}
        onError={() => console.log("Error")}
        onHttpError={() => console.log("HTTP ERROR")}
        />
    )
}

export default Web

const styles = StyleSheet.create({
    Container:{
        flex:1
    }
})
