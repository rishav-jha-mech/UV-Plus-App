import React, { useState } from 'react'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { StyleSheet, Text, View, TextInput, Pressable } from 'react-native'
import validator from 'validator'
import { useNavigation } from '@react-navigation/native';

const Home = () => {
    const navigation = useNavigation();

    const [url, setUrl] = useState("")
    const [message, setMessage] = useState()

    const PostReq = (url) => {
        console.log(url)
        if (!validator.isURL(url) && url == "") { setMessage("Enter A Valid Url 😒"); return; }
        else { setMessage("");}

        navigation.navigate('Result Tab', {
            url: url,
        });
    }
    
    return (
        <View style={styles.Container}>
            <View style={styles.urlContainer}>
                <TextInput
                    style={styles.Input}
                    placeholder="Enter URL"
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
            {message ?
                <Text style={styles.Message}>
                    {message}
                </Text>
                :<></>
            }
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
