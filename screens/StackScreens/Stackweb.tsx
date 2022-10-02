import React, { createRef, useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import WebView from 'react-native-webview'
import FeatherIcon from 'react-native-vector-icons/Feather';
import { ARP, SAGO, SHWE } from '../env';
import { RouteProp, useRoute } from '@react-navigation/native';
import { AppParamList } from '../NAVIGATION';


const StackWeb:React.FC = () => {

    const route = useRoute<RouteProp<AppParamList, 'WebStack'>>();
    const HOMEPAGE = (route.params.url == undefined) ? "https://www.google.com/" : route.params.url;

    const [URL, setURL] = useState(HOMEPAGE)
    const [title, setTitle] = useState('')
    const webViewRef = createRef<WebView>();
    const [downloadable, setDownloadable] = useState<boolean>(false)

    const isDownloadable = () => {

        if (URL.includes(ARP) || URL.includes(SAGO) || URL.includes(SHWE)) {
            setDownloadable(true);
        } else {
            setDownloadable(false);
        }
    }
    return (
        <>
            <View style={styles.header}>
                <Text style={styles.headerText} numberOfLines={1}>{title}</Text>
            </View>
            <WebView
                source={{ uri: URL }}
                // ref={(ref) => webViewRef.current = ref}
                style={styles.Container}
                domStorageEnabled={true}
                pullToRefreshEnabled={true}
                allowsFullscreenVideo={true}
                onNavigationStateChange={
                    (navState) => {
                        setURL(navState.url);
                        isDownloadable();
                        setTitle(navState.title)
                    }
                }
            />
            {downloadable ?
                <TouchableOpacity style={styles.down}>
                    <FeatherIcon name='download' size={28} color={'#fff'} />
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
    },
    header:{
        elevation: 2,
        backgroundColor: '#66f',
        paddingHorizontal: 8,
        paddingVertical: 14,
        flexDirection : 'row',
        alignItems: 'center',
    },
    headerText:{
        color: '#fff',
        fontSize: 16,
        letterSpacing: 1,
    }
})
