import React, { useState } from 'react'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { StyleSheet, Text, View, TextInput, Pressable } from 'react-native'
import axios from 'axios'


const Home = () => {

    const [url, seturl] = useState()

    const SendReq = (url) => {
        
        console.log(url)
        
        axios.post('http://127.0.0.1:6969', {
            uri: url,
        })
            .then((response) => handleRes(response.data))
            .catch(function (error) {
                console.log(error);
            });
    }
    const handleRes = (data) => {
        console.log(data)
    }

    return (
        <View style={styles.Container}>
            <View style={styles.urlContainer}>
                <TextInput
                    style={styles.Input}
                    placeholder="Enter URL"
                    keyboardType="url"
                    selectionColor="#333"
                    onChangeText={(url) => seturl(url)}
                />
                {/* Pressing this button will send the url to axios */}
                <Pressable
                    style={styles.Search}
                    onPress={() => {SendReq(url);}}
                >
                    <FontAwesomeIcon
                        icon={faSearch}
                        size={24}
                        color={"#ff156f"}
                    />
                </Pressable>
            </View>
        </View>
    )
}

export default Home

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: '#ddf'
    },
    urlContainer: {
        backgroundColor: 'dodgerblue',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 16,
        paddingHorizontal: 12
    },
    Input: {
        backgroundColor: '#fff',
        flex: 1,
        borderRadius: 24,
        paddingLeft: 16,
    },
    Search: {
        position: 'absolute',
        alignItems: 'center',
        right: 16,
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 25,
    }
})
