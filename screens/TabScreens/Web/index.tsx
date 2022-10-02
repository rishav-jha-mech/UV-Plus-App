import React, { useState, useRef, createRef } from 'react'
import { StyleSheet, View, TextInput, TouchableOpacity, Modal, Text, Pressable, BackHandler } from 'react-native'
import WebView from 'react-native-webview'
import { useNavigation } from '@react-navigation/native';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import OctiIcon from 'react-native-vector-icons/Octicons';
import IonIcon from 'react-native-vector-icons/Ionicons';
import FeatherIcon from 'react-native-vector-icons/Feather';
import validator from 'validator'
import copyToClipboard from '../../Scripts/copyToClipboard'
import ModalCard from '../../Components/ModalCard';
import toShare from '../../Scripts/toShare'
import { ARP, SAGO, SHWE } from '../../env';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp, useRoute } from '@react-navigation/native';
import { AppParamList } from '../../NAVIGATION';
import { CardStateParams } from '../../types';

type webProps = StackNavigationProp<AppParamList, 'Web'>;

const Web: React.FC<webProps> = () => {
    const route = useRoute<RouteProp<AppParamList, 'WebStack'>>();
    const HOMEPAGE = (route.params == undefined) ? "https://www.google.com/" : route.params.url;

    const navigation = useNavigation();
    const [URL, setURL] = useState<string>(HOMEPAGE)
    const [tempURL, setTempURL] = useState<string>(URL)
    const [webkey, setWebKey] = useState<number>(0) // Not a very good option, this does a force update on the webview component
    const [showModal, setShowModal] = useState<boolean>(false)
    const [showCard, setShowCard] = useState<boolean>(true)
    const [canGoBackward, setCanGoBackward] = useState<boolean>(false)
    const [downloadable, setDownloadable] = useState<boolean>(false)
    const webViewRef = useRef<any>();
    const inputRef = createRef<TextInput>();

    // Hook for ModalCard  
    const [cardState, setCardState] = useState<CardStateParams>({
        bg: "#fff",
        text: "",
        fontColor: "#4bb543",
        iconName: ""
    })


    const isDownloadable = () => {
        if (URL.includes(ARP) || URL.includes(SAGO) || URL.includes(SHWE)) {
            setDownloadable(true);
        } else {
            setDownloadable(false);
        }
    }

    // Backaction defined here, if the user cant go back he will go to home tab
    const backAction = () => {
        if (canGoBackward) {
            console.log('simon go bavk')
            webViewRef.current.goBack();
        } else {
            console.log('simon contgo')
            navigation.goBack();
        }
        return true;
    };

    BackHandler.addEventListener(
        "hardwareBackPress",
        backAction
    );
    const Validate = (text: string): void => { // If the input isnt a url then it will go to GoogleIt function will be called.
        if (validator.isURL(text)) {
            setURL(text)
            setTempURL(text)
        } else {
            GoogleIt(text)
        }
    }
    const GoogleIt = (searchParam: string): void => {
        var searchURL = HOMEPAGE + "search?q=" + searchParam
        setURL(searchURL)
        setTempURL(searchURL)
    }
    const eraseInput = () => {
        inputRef.current?.focus();
        setTempURL('');
    }
    return (
        <>
            <View style={TopBar.Container}>
                <TouchableOpacity style={TopBar.Opt} onPress={() => setURL(HOMEPAGE)}>
                    <OctiIcon name="home" color={'#555'} size={22} />
                </TouchableOpacity>
                <View style={TopBar.Row}>
                    <TextInput
                        style={TopBar.Input}
                        ref={inputRef}
                        placeholder="Search or type web address"
                        placeholderTextColor={"#666"}
                        value={tempURL}
                        onPressIn={() => { inputRef.current?.focus() }}
                        textAlign="left"
                        selectTextOnFocus={true}
                        onChangeText={setTempURL}
                        autoCorrect={false}  // Disables the red line
                        onSubmitEditing={({ nativeEvent: { text } }) => { Validate(text) }}
                    />
                    <View style={TopBar.removeIcon}>
                        <TouchableOpacity onPress={() => eraseInput()}>
                            <FontAwesome5Icon name='times-circle' size={20} color={'#333'} />
                        </TouchableOpacity>
                    </View>
                </View>
                <TouchableOpacity style={TopBar.Opt} onPress={() => { setShowModal(!showModal), setShowCard(true) }}>
                    <IonIcon name='ellipsis-vertical' color={'#555'} size={20} />
                </TouchableOpacity>
            </View>

            <Modal style={{ flex: 1 }} visible={showModal} transparent={true} animationType={'fade'}>
                <Pressable style={modalStyle.Container} onPress={() => { setShowModal(!showModal); setShowCard(!showCard) }}>
                    {showCard ?
                        <Pressable style={modalStyle.Card}>
                            <TouchableOpacity
                                style={modalStyle.Button}
                                onPress={() => {
                                    setShowCard(false);
                                    copyToClipboard(tempURL); setCardState({
                                        bg: "#fff",
                                        iconName: 'check-circle',
                                        text: "Link Copied To Clipboard",
                                        fontColor: "green"
                                    })
                                }}
                            >
                                <Text style={modalStyle.ButtonText}>
                                    Copy Link
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={modalStyle.Button}
                                onPress={() => { toShare(tempURL); setShowCard(false); setShowModal(false) }}
                            >
                                <Text style={modalStyle.ButtonText}>
                                    Share Link
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={modalStyle.Button}
                                onPress={() => { setShowModal(false); setWebKey(webkey + 1) }}
                            >
                                <Text style={modalStyle.ButtonText}>
                                    Reload
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={modalStyle.Button}
                                onPress={() => { webViewRef.current.clearCache(true);setShowCard(false); setCardState({
                                    bg: "#fff",
                                    iconName: 'check-circle',
                                    text: "Cache Cleared",
                                    fontColor: "dodgerblue"
                                })}}
                            >
                                <Text style={modalStyle.ButtonText}>
                                    Clear Cache
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={modalStyle.Button}
                                onPress={() => { 
                                    webViewRef.current.clearHistory(true) 
                                    setShowCard(false);
                                    setCardState({
                                        bg: "#fff",
                                        iconName: 'check-circle',
                                        text: "History Cleared",
                                        fontColor: "dodgerblue"
                                    })
                                }} // Working
                            >
                                <Text style={modalStyle.ButtonText}>
                                    Clear History (Forward/Back)
                                </Text>
                            </TouchableOpacity>
                        </Pressable>
                        :
                        <ModalCard cardState={cardState} />
                    }
                </Pressable>
            </Modal>

            <WebView
                key={webkey}
                source={{ uri: URL }}
                ref={(ref) => webViewRef.current = ref}
                style={styles.Container}
                domStorageEnabled={true}
                allowFileAccessFromFileURLs={true}
                pullToRefreshEnabled={true}
                allowsFullscreenVideo={true}
                onNavigationStateChange={(navState) => { setURL(navState.url); setTempURL(navState.url); setCanGoBackward(navState.canGoBack); isDownloadable(); }}
                // renderLoading={true}
                // ...
                setSupportMultipleWindows={false} // We dont want the user to go out of our app
            />
            {downloadable ?
                <TouchableOpacity style={styles.down}>
                    <FeatherIcon name='ellipsis-vertical' size={28} color={'#fff'} />
                </TouchableOpacity>
                : <></>}
        </>
    )
}

export default Web

const modalStyle = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.3)',
        alignItems: 'center',
        justifyContent: 'center'
    },
    Card: {
        backgroundColor: '#fff',
        minHeight: '30%',
        minWidth: '65%',
        borderRadius: 16,
        elevation: 8,
        padding: 16,
    },
    Button: {
        marginVertical: 6,
        backgroundColor: 'rgba(30, 143, 255,0.15)',
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderRadius: 6,
        borderWidth: 0.6,
        borderColor: '#ddd'
    },
    ButtonText: {
        fontSize: 16,
        fontWeight: '700',
        textAlign: 'center',
        color: 'dodgerblue'
    }
})
const TopBar = StyleSheet.create({
    Container: {
        paddingVertical: 10,
        backgroundColor: '#fff',
        flexDirection: "row",
        elevation: 2
    },
    Row: {
        flexDirection: 'row',
        flex: 7,
        marginHorizontal: 6.0
    },
    Input: {
        backgroundColor: '#edebeb',
        paddingVertical: 8,
        paddingHorizontal: 14,
        width: '100%',
        borderRadius: 24,
        fontSize: 13,
    },
    removeIcon: {
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        borderTopRightRadius: 24,
        borderBottomRightRadius: 24,
        paddingVertical: 10.0,
        paddingHorizontal: 10,
        backgroundColor: '#edebeb',

    },
    Opt: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})

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
