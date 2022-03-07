import React, { useRef, useState } from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faArrowDown } from '@fortawesome/free-solid-svg-icons'
import WebView from 'react-native-webview'
import { ARP, SAGO, SHWE } from './env';

const StackWeb = (props) => {
    const HOMEPAGE = (props.route.params == undefined) ? "https://www.google.com/" : props.route.params.theUrl;

    const [URL, setURL] = useState(HOMEPAGE)
    const webViewRef = useRef();
    const [downloadable, setDownloadable] = useState(false)

    const isDownloadable = () => {

        if (URL.includes(ARP) || URL.includes(SAGO) || URL.includes(SHWE)) {
            setDownloadable(true);
        } else {
            setDownloadable(false);
        }
    }
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
                onNavigationStateChange={(navState) => { setURL(navState.url); isDownloadable(); }}
            />
            {downloadable ?
                <TouchableOpacity style={styles.down}>
                    <FontAwesomeIcon icon={faArrowDown} size={28} color={'#fff'} />
                </TouchableOpacity>
                : <></>}
        </>
    )
}

export default StackWeb

const styles = StyleSheet.create({
    Container: {
        flex: 1,
    },
    down: {
        position: 'absolute',
        padding: 12.0,
        borderRadius: 1000.0,
        bottom: 35.0,
        right: 15.0,
        backgroundColor: '#ff156f',
        elevation: 10.0
    }
})
