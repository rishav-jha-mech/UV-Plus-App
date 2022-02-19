import React, { useState } from 'react'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'

import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, View, TextInput, StatusBar, ImageBackground, Pressable } from 'react-native'

const Banner = (params) => {
    const BANNER = { uri: "https://raw.githubusercontent.com/byprogrammers/LCRN10-cryptocurrency-app-starter/master/assets/images/banner.png" };
    
    const [url, setUrl] = useState("")
    const navigation = useNavigation();
    const PostReq = (url) => {
        console.log('I am Callled')
        navigation.navigate('Result Tab', {
            url: url,
        });
    }
    return (<>
        <StatusBar
            animated={true}
            backgroundColor="#6E55F7"
        />
        <View style={styles.Banner}>
            <ImageBackground source={BANNER} style={styles.BannerImageBG} resizeMode={"cover"} >
                <Text style={styles.NavbarText}>Universal Downloader</Text>
            </ImageBackground>
            <View style={styles.urlContainer}>
                <TextInput
                    style={styles.Input}
                    placeholder="Enter url"
                    keyboardType="url"
                    defaultValue={url}
                    showSoftInputOnFocus={true}
                    onSubmitEditing={() => PostReq(url)}
                    onChangeText={(url) => setUrl(url)}
                />
                <Pressable
                    style={styles.Search}
                    onPress={() => PostReq(url) }
                >
                    <FontAwesomeIcon
                        icon={faSearch}
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
        height: 225,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#66f',
        marginBottom:50
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
        fontSize: 18.0,
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