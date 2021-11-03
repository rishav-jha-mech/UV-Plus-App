import React, { useState } from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native'
import WebView from 'react-native-webview'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faArrowLeft, faArrowRight, faCopy, faEllipsisV, faHome, faRedo } from '@fortawesome/free-solid-svg-icons'

const HOMEPAGE = "https://www.google.com/"

const Web = ({ route }) => {
    var url = ""
    try{url = route.params.url}
    catch{ url = HOMEPAGE }

    const [URL, setURL] = useState(url)
    const [tempURL,setTempURL] = useState(URL)
    const [start, setStart] = useState(0)
    const [end, setEnd] = useState(0)

    const LoadStarted = () =>{
        setEnd(URL.length)
    }
    return (
        <>
            <View style={TopBar.Container}>
                <TouchableOpacity style={TopBar.Opt} onPress={() => setURL(HOMEPAGE)}>
                    <FontAwesomeIcon icon={faHome} color={'#ddd'} size={24} />
                </TouchableOpacity>
                <TextInput
                    style={TopBar.Input}
                    placeholder="Enter Url"
                    value={tempURL}
                    onChangeText={setTempURL}
                    autoCorrect={false}  // Disables the red line
                    onSubmitEditing={({ nativeEvent: { text, eventCount, target }}) => {setURL(text)}}
                    
                />
                <TouchableOpacity style={TopBar.Copy}>
                    <FontAwesomeIcon icon={faCopy} color={'#ddd'} />
                </TouchableOpacity>
                <TouchableOpacity style={TopBar.Opt}>
                    <FontAwesomeIcon icon={faEllipsisV} color={'#ddd'} />
                </TouchableOpacity>
            </View>
            <WebView
                source={{ uri: URL }}
                style={styles.Container}
                onLoad={() => LoadStarted()}
                pullToRefreshEnabled={true}
                allowsFullscreenVideo={true}
                onNavigationStateChange={(navState) => {setURL(navState.url);setTempURL(navState.url)}}
                renderLoading={true}

            />
            <View style={BotBar.Container}>
                <TouchableOpacity style={BotBar.Opt}>
                    <FontAwesomeIcon icon={faArrowLeft} color={'#555'} size={25} />
                </TouchableOpacity>
                <TouchableOpacity style={BotBar.Opt}>
                    <FontAwesomeIcon icon={faRedo} color={'#555'} size={25} />
                </TouchableOpacity>
                <TouchableOpacity style={BotBar.Opt}>
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
        backgroundColor: 'purple',
        flexDirection: "row"
    },
    Input: {
        backgroundColor: '#fff',
        paddingVertical: 4,
        paddingHorizontal:10,
        flex: 6,
        borderRadius:16,
        marginHorizontal:5,
        fontSize:13
    },
    Copy: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ff156f'
    },
    Opt: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'dodgerblue'
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
