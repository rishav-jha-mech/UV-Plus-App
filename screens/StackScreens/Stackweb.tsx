import React, { useRef, useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, BackHandler } from 'react-native'
import WebView from 'react-native-webview'
import FeatherIcon from 'react-native-vector-icons/Feather';
import { ARP, SAGO, SHWE, YOUTUBE } from '../env';
import { RouteProp, useRoute } from '@react-navigation/native';
import { AppParamList } from '../NAVIGATION';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { pLog } from '../constants';


type resultScreenProps = StackNavigationProp<AppParamList, 'ResultStack'>;

const StackWeb: React.FC = () => {

    const route = useRoute<RouteProp<AppParamList, 'WebStack'>>();
    const navigation = useNavigation<resultScreenProps>();
    const HOMEPAGE = (route.params.url == undefined) ? "https://www.google.com/" : route.params.url;

    const [URL, setURL] = useState(HOMEPAGE)
    const [title, setTitle] = useState('')
    const webViewRef = useRef<any>();
    const [canGoBack, setCanGoBack] = useState(false)
    const [downloadable, setDownloadable] = useState<boolean>(false)

    

    // Backaction defined here, if the user cant go back he will go to home tab
    const backAction = () => {
        if (canGoBack) {
            webViewRef.current.goBack();
        } else {
            BackHandler.removeEventListener('hardwareBackPress', backAction);
            navigation.goBack();
        }
        return true;
    };


    BackHandler.addEventListener(
        "hardwareBackPress",
        backAction
    );
    
    const isDownloadable = () => {
        if (URL.includes(ARP) || URL.includes(SAGO) || URL.includes(SHWE) || URL.includes(YOUTUBE)) {
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
                ref={webViewRef}
                style={styles.Container}
                domStorageEnabled={true}
                pullToRefreshEnabled={true}
                allowsFullscreenVideo={true}
                onNavigationStateChange={
                    (navState) => {
                        setURL(navState.url);
                        isDownloadable();
                        setTitle(navState.title)
                        navState.canGoBack ? setCanGoBack(true) : setCanGoBack(false)
                    }
                }
            />
            {downloadable ?
                <TouchableOpacity
                    style={styles.down}
                    activeOpacity={0.4}
                    onPress={() => {
                        navigation.navigate('ResultStack', { url: URL })
                    }}
                >
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
        height: 55,
        width: 55,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 1000.0,
        bottom: 60.0,
        right: 12.0,
        backgroundColor: '#66f',
        elevation: 1000.0
    },
    header: {
        elevation: 2,
        backgroundColor: '#66f',
        paddingHorizontal: 8,
        paddingVertical: 14,
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerText: {
        color: '#fff',
        fontSize: 16,
        letterSpacing: 1,
    }
})
