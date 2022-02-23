import React, { useRef } from 'react'
import { StyleSheet } from 'react-native'
import WebView from 'react-native-webview'


const StackWeb = (props) => {
    const HOMEPAGE = (props.route.params == undefined) ? "https://www.google.com/" : props.route.params.theUrl;

    const URL = HOMEPAGE;
    const webViewRef = useRef();
    
    return (
        <>
            <WebView
                source={{ uri: URL }}
                ref={(ref) => webViewRef.current = ref}
                style={styles.Container}
                domStorageEnabled={true}
                pullToRefreshEnabled={true}
                allowsFullscreenVideo={true}
                renderLoading={true}
            />
        </>
    )
}

export default StackWeb

const styles = StyleSheet.create({
    Container: {
        flex: 1,
    },
})
