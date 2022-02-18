import React, { useState } from 'react'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { StyleSheet, Text, View, TextInput, Pressable, Button } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import ReadPermission from './Scripts/ReadPermission';

const Home = () => {
    ReadPermission()
    const navigation = useNavigation();

    const [url, setUrl] = useState("")

    const PostReq = (url) => {
        console.log(url)

        navigation.navigate('Result Tab', {
            url: url,
        });
    }
    
    return (
        <View style={styles.Container}>
            <View style={styles.Navbar}>
                <Text style={styles.NavbarText}>Universal Downloader</Text>
                <View style={styles.urlContainer}>
                    <TextInput
                        style={styles.Input}
                        placeholder="Enter url"
                        keyboardType="url"
                        selectionColor="#333"
                        defaultValue={url}
                        onChangeText={(url) => setUrl(url)}
                    />
                    {/* Pressing this button will send the url to axios */}
                    <Pressable
                        style={styles.Search}
                        onPress={() => { PostReq(url); }}
                    >
                        <FontAwesomeIcon
                            icon={faSearch}
                            size={24}
                            color={"#ff156f"}
                        />
                    </Pressable>
                </View>
            </View>
        </View>
    )
}

export default Home

const styles = StyleSheet.create({
    Navbar:{
        position:'relative',
        paddingHorizontal: 16.0,
        paddingVertical: 16.0,
        height: 225,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor: '#5959ff'
    },
    NavbarText:{
        fontSize: 32.0,
        fontWeight: '700',
        color: '#fff'
    },
    Container: {
        flex: 1,
        backgroundColor: '#fcfcfc'
    },
    urlContainer: {
        position:'absolute',
        bottom: -48,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 20.0,
        paddingHorizontal: 12
    },
    Input: {
        backgroundColor: '#fff',
        flex: 1,
        borderRadius: 50.0,
        padding: 16.0,
        elevation: 12.0
    },
    Search: {
        position: 'absolute',
        alignItems: 'center',
        right: 16,
        padding: 10,
        backgroundColor: '#000',
        borderRadius: 25,
    },
    Message: {
        color: '#fff',
        fontSize: 20,
        textAlign: 'center',
        backgroundColor: 'red',
        paddingHorizontal: 16,
        paddingVertical: 10,
    },
})
