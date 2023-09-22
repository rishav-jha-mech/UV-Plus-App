import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useRef, useState, useEffect } from 'react';
import { BackHandler, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import WebView from 'react-native-webview';
import { AppParamList } from '../NAVIGATION';
import { Colors } from '../constants';
import { ARP, SAGO, SHWE, YOUTUBE } from '../env';
import FontawesomeIcon from 'react-native-vector-icons/FontAwesome5'
import t from 'twrnc'

type resultScreenProps = NativeStackNavigationProp<AppParamList, 'ResultStack'>;
const jsCode = ``;

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

    useEffect(() => {

        BackHandler.addEventListener(
            "hardwareBackPress",
            backAction
        );

        return () => {
            BackHandler.removeEventListener('hardwareBackPress', backAction);

        }
    }, [])


    const isDownloadable = () => {
        if (URL.includes(ARP) || URL.includes(SAGO) || URL.includes(SHWE) || URL.includes(YOUTUBE)) {
            setDownloadable(true);
        } else {
            setDownloadable(false);
        }
    }


    return (
        <SafeAreaView style={t`flex-1`}>
            <View style={[t`flex-row items-center h-15`, {
                backgroundColor: Colors.PrimaryColor
            }]}>
                <TouchableOpacity
                    style={t`p-3`}
                    onPress={() => backAction()}
                >
                    <FontawesomeIcon name='arrow-left' color={Colors.WhiteColor} size={18} />
                </TouchableOpacity>
                <ScrollView horizontal  showsHorizontalScrollIndicator={false}>
                    <Text style={t`text-white text-base flex-1 px-3`}>
                        {title}
                    </Text>
                </ScrollView>
            </View>
            <WebView
                source={{ uri: URL }}
                ref={webViewRef}
                style={t`flex-1`}
                injectedJavaScript={jsCode}
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
        </SafeAreaView>
    )
}

export default StackWeb

const styles = StyleSheet.create({
    down: {
        position: 'absolute',
        height: 55,
        width: 55,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 1000.0,
        bottom: 60.0,
        right: 12.0,
        backgroundColor: Colors.PrimaryColor,
        elevation: 1000.0
    },
    header: {
        elevation: 2,
        backgroundColor: Colors.PrimaryColor,
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
