import React, { useState, useRef } from 'react'
import { StyleSheet, View, TextInput, TouchableOpacity, Modal, Text, Pressable, BackHandler } from 'react-native'
import WebView from 'react-native-webview'
import { useNavigation } from '@react-navigation/native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCheckCircle, faArrowDown, faEllipsisV, faHome, faTimesCircle } from '@fortawesome/free-solid-svg-icons'

import validator from 'validator'
import copyToClipboard from '../Scripts/copyToClipboard'
import Success from '../Components/Success'
import toShare from '../Scripts/toShare'

import { ARP,SAGO,SHWE } from '../env';

const Web = (props) => {
    const HOMEPAGE = (props.route.params == undefined) ? "https://www.google.com/" : props.route.params.theUrl;

    const navigation = useNavigation();
    const [URL, setURL] = useState(HOMEPAGE)
    const [tempURL, setTempURL] = useState(URL)
    const [webkey, setWebKey] = useState(0) // Not a very good option, this does a force update on the webview component
    const [showModal, setShowModal] = useState(false)
    const [showCard, setShowCard] = useState(true)
    const [canGoBackward, setCanGoBackward] = useState(false)
    const [downloadable,setDownloadable] = useState(false)
    const webViewRef = useRef();
    const inputRef = useRef();

    // Hooks for Success Card
    const [bg, setBg] = useState('#fff')
    const [font, setFont] = useState()
    const [text, setText] = useState("")
    const [foteco, setFoteco] = useState("#4bb543")

     
    const isDownloadable = () =>{
   if (URL.includes(ARP) || URL.includes(SAGO) || URL.includes(SHWE)){
            setDownloadable(true);
        }else{
            setDownloadable(false);
        }
    }

    // Backaction defined here, if the user cant go back he will go to home tab
    const backAction = () => {
        if (canGoBackward){
            webViewRef.current.goBack();
        }else { 
            navigation.navigate('Home')
        }
        return true;
    };
  
    BackHandler.addEventListener(
        "hardwareBackPress",
        backAction
    );
    // Function to set Card props
    const showOtherCard = (bg, font, text, foteco) => {
        setShowCard(false);
        setFont(font);
        setText(text);
        if (bg == null) { setBg("#fff"); } else { setBg(bg); }
        if (foteco == null) { setFoteco("#4bb543"); } else { setFoteco(foteco); }
    }
    const Validate = (text) => { // If the input isnt a url then it will go to GoogleIt function will be called.
        if (validator.isURL(text)) {
            setURL(text)
            setTempURL(text)
        } else {
            GoogleIt(text)
        }
    }
    const GoogleIt = (searchParam) => {
        var searchURL = HOMEPAGE + "search?q=" + searchParam
        setURL(searchURL)
        setTempURL(searchURL)
    }
    const eraseInput = () => {
        inputRef.current.focus();
        setTempURL('');
    }
    return (
        <>
            <View style={TopBar.Container}>
                <TouchableOpacity style={TopBar.Opt} onPress={() => setURL(HOMEPAGE)}>
                    <FontAwesomeIcon icon={faHome} color={'#555'} size={22} />
                </TouchableOpacity>
                <View style={TopBar.Row}>
                    <TextInput
                        style={TopBar.Input}
                        ref={inputRef}
                        placeholder="Search or type web address"
                        placeholderTextColor={"#666"}
                        value={tempURL}
                        onPressIn={() => { inputRef.current.focus() }}
                        textAlign="left"
                        selectTextOnFocus={true}
                        onChangeText={setTempURL}
                        autoCorrect={false}  // Disables the red line
                        onSubmitEditing={({ nativeEvent: { text, eventCount, target } }) => { Validate(text) }}
                    />
                    <View style={TopBar.removeIcon}>
                        <TouchableOpacity onPress={() => eraseInput()}>
                            <FontAwesomeIcon icon={faTimesCircle} size={20} color={'#333'} />
                        </TouchableOpacity>
                    </View>
                </View>
                <TouchableOpacity style={TopBar.Opt} onPress={() => { setShowModal(!showModal), setShowCard(true) }}>
                    <FontAwesomeIcon icon={faEllipsisV} color={'#555'} size={20} />
                </TouchableOpacity>
            </View>

            <Modal style={{ flex: 1 }} visible={showModal} transparent={true} animationType={'fade'}>
                <Pressable style={modalStyle.Container} onPress={() => { setShowModal(!showModal); setShowCard(!showCard) }}>
                    {showCard ?
                        <Pressable style={modalStyle.Card}>
                            <TouchableOpacity
                                style={modalStyle.Button}
                                onPress={() => { copyToClipboard(tempURL); showOtherCard("#fff", faCheckCircle, "Link Copied To Clipboard", "green") }}
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
                                onPress={() => { webViewRef.current.clearCache(true); showOtherCard("#fff", faCheckCircle, "Cache Cleared", "dodgerblue") }}
                            >
                                <Text style={modalStyle.ButtonText}>
                                    Clear Cache
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={modalStyle.Button}
                                onPress={() => { webViewRef.current.clearHistory(true) }} // Working
                            >
                                <Text style={modalStyle.ButtonText}>
                                    Clear History (Forward/Back)
                                </Text>
                            </TouchableOpacity>
                        </Pressable>
                        :

                        <Success bg={bg} font={font} text={text} foteco={foteco} />

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
                onNavigationStateChange={(navState) => { setURL(navState.url); setTempURL(navState.url); setCanGoBackward(navState.canGoBack); isDownloadable();}}
                renderLoading={true}
                // ...
                setSupportMultipleWindows={false} // We dont want the user to go out of our app
            />

             {downloadable ?
                <TouchableOpacity style={styles.down}>
                    <FontAwesomeIcon icon={faArrowDown} size={28} color={'#fff'} />
                </TouchableOpacity>
            :<></>}
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
    down:{
        position:'absolute',
        padding:12.0,
        borderRadius: 1000.0,
        bottom: 35.0,
        right: 15.0,
        backgroundColor: '#ff156f',
        elevation: 10.0
    }
})
