import React, { useState, useRef } from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native'
import WebView from 'react-native-webview'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faArrowLeft, faArrowRight, faCopy, faEllipsisV, faHome, faRedo } from '@fortawesome/free-solid-svg-icons'
import validator from 'validator'
import { ScrollView } from 'react-native-gesture-handler'

const HOMEPAGE = "https://www.google.com/"

const Web = ({ route }) => {
    var url = ""
    try{url = route.params.url}
    catch{ url = HOMEPAGE }

    const [URL, setURL] = useState(url)
    const [tempURL,setTempURL] = useState(URL)
    const [webkey,setWebKey] = useState(0) // Not a very good option, this does a force update on the webview component
    const webViewRef = useRef();

    const Validate = (text) =>{ // If the input isnt a url then it will go to GoogleIt function will be called.
        if(validator.isURL(text)){
            setURL(text)
            setTempURL(text)
        }else{
            GoogleIt (text)
        }
    }
    const GoogleIt = (searchParam) =>{
        var searchURL = HOMEPAGE + "search?q=" +searchParam
        setURL(searchURL)
        setTempURL(searchURL)
    }
    return (
        <>
            <View style={TopBar.Container}>
                <TouchableOpacity style={TopBar.Opt} onPress={() => setURL(HOMEPAGE)}>
                    <FontAwesomeIcon icon={faHome} color={'#555'} size={22} />
                </TouchableOpacity>
                <TextInput
                    style={TopBar.Input}
                    placeholder="Search or type web address"
                    placeholderTextColor={"#666"}
                    value={tempURL}
                    onChangeText={setTempURL}
                    autoCorrect={false}  // Disables the red line
                    onSubmitEditing={({ nativeEvent: { text, eventCount, target }}) => {Validate(text)}}
                />
                <TouchableOpacity style={TopBar.Copy}>
                    <FontAwesomeIcon icon={faCopy} color={'#555'} size={19} />
                </TouchableOpacity>
                <TouchableOpacity style={TopBar.Opt}>
                    <FontAwesomeIcon icon={faEllipsisV} color={'#555'} size={20} />
                </TouchableOpacity>
            </View>
            <WebView
                key={webkey}
                source={{ uri: URL }}
                ref={(ref) => webViewRef.current = ref}
                style={styles.Container}
                pullToRefreshEnabled={true}
                allowsFullscreenVideo={true}
                onNavigationStateChange={(navState) => {setURL(navState.url);setTempURL(navState.url)}}
                renderLoading={true}
            />
            <View style={BotBar.Container}>
                <TouchableOpacity style={BotBar.Opt} onPress={() => { webViewRef.current.goBack(); }} >
                    <FontAwesomeIcon icon={faArrowLeft} color={'#555'} size={25} />
                </TouchableOpacity>
                <TouchableOpacity style={BotBar.Opt} onPress={() => { setWebKey(webkey+1) } }>
                    <FontAwesomeIcon icon={faRedo} color={'#555'} size={25} />
                </TouchableOpacity>
                <TouchableOpacity style={BotBar.Opt} onPress={() => { webViewRef.current.goForward(); }}  >
                    <FontAwesomeIcon icon={faArrowRight} color={'#555'} size={25} />
                </TouchableOpacity>
            </View>
        </>
    )
}

export default Web

const TopBar = StyleSheet.create({
    Container: {
        paddingVertical: 10,
        backgroundColor: '#fff',
        flexDirection: "row",
        elevation: 2
    },
    Input: {
        backgroundColor: '#edebeb',
        paddingVertical: 4,
        paddingHorizontal:10,
        flex: 6,
        borderRadius: 24,
        marginHorizontal:5,
        fontSize:13,
        elevation: 2
    },
    Copy: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: '#ff156f'
    },
    Opt: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: 'dodgerblue'
    }
})

const BotBar = StyleSheet.create({
    Container:{
        flexDirection:"row",
        paddingHorizontal:10,
        justifyContent:"center",
        alignItems:'center',
    },
    Opt:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        paddingVertical:10
    }
})

const styles = StyleSheet.create({
    Container: {
        flex: 1,
    },
})
