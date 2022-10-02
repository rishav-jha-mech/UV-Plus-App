import React, { useState, useRef } from 'react';
import FeatherIcon from 'react-native-vector-icons/Feather'

import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, View, TextInput, ImageBackground, Pressable } from 'react-native';
import isURL from 'validator/lib/isURL';
import { aBannerImage } from '../../constants';

const Banner = () => {

    const [url, setUrl] = useState("")
    const navigation = useNavigation();
    const inputRef = useRef();
    const PostReq = (url) => {

        if (isURL(url)) {
            navigation.navigate('Result Tab', {
                url: url,
            });
        } else {
            // What's the point of annoying the users by alerting them their url is incorrect ?, instead redirect them to Google
            // So if url is okay then send them to my server
            // Else if its not event a url send it to Google Search
            navigation.navigate('Stack Web', {
                theUrl: `https://www.google.com/search?q=${url}`
            })
        }
    }
    return (<>
        <View style={styles.Banner}>
            <ImageBackground source={aBannerImage} style={styles.BannerImageBG} resizeMode={"cover"} >
                <Text style={styles.NavbarText}>Universal Downloader</Text>
            </ImageBackground>
            <View style={styles.urlContainer}>
                <TextInput
                    style={styles.Input}
                    ref={inputRef}
                    placeholder="Enter url"
                    keyboardType="url"
                    defaultValue={url}
                    showSoftInputOnFocus={true}
                    onPressIn={() => { inputRef.current.focus() }}
                    selectTextOnFocus={true}
                    onSubmitEditing={() => PostReq(url)}
                    onChangeText={(url) => setUrl(url)}
                />
                <Pressable
                    style={styles.Search}
                    onPress={() => PostReq(url)}
                >
                    <FeatherIcon
                        name='search'
                        size={24}
                        color={"#fff"}
                    />
                </Pressable>
            </View>
        </View>
    </>);
}

export default Banner;

const styles = StyleSheet.create({
    Banner: {
        height: 250,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#66f',
        marginBottom: 50
    },
    BannerImageBG: {
        flex: 1,
        alignItems: "center",
        justifyContent: 'center',
        width: "100%",
    },
    NavbarText: {
        fontSize: 32.0,
        fontWeight: '700',
        color: '#fff'
    },
    urlContainer: {
        position: 'absolute',
        bottom: -48,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 20.0,
        paddingHorizontal: 12,
    },
    Input: {
        backgroundColor: '#fff',
        flex: 1,
        fontSize: 16.0,
        borderRadius: 50.0,
        padding: 16.0,
        elevation: 12.0,
    },
    Search: {
        position: 'absolute',
        elevation: 13.0,
        alignItems: 'center',
        right: 16,
        padding: 14.0,
        backgroundColor: '#66f',
        borderRadius: 25,
    },
})