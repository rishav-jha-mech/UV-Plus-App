import React from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native'
import WebView from 'react-native-webview'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faArrowLeft, faArrowRight, faCircle, faCircleNotch, faCopy, faEllipsisV, faRedo } from '@fortawesome/free-solid-svg-icons'
import { BottomTabBar } from '@react-navigation/bottom-tabs'

const Web = ({ route }) => {

    var URL = route.params.url
    
    if (URL == undefined) { URL = "https://google.com" }

    return (
        <>
            <View style={TopBar.Container}>
                <TextInput
                    style={TopBar.Input}
                    defaultValue={URL}
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
                pullToRefreshEnabled={true}
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
        paddingVertical: 5,
        paddingHorizontal: 8,
        backgroundColor: 'purple',
        flexDirection: "row"
    },
    Input: {
        backgroundColor: '#fff',
        paddingVertical: 6,
        flex: 6
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
        alignItems:'center'
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
