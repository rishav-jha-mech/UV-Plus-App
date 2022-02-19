import React, { useState } from 'react'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { StyleSheet, Text, View, TextInput, StatusBar, ImageBackground, Pressable } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import ReadPermission from './Scripts/ReadPermission';

const Home = () => {
    ReadPermission()

    return (
        <>
        <View style={{backgroundColor: '#fcfcfc',flex:1}}>
        <Banner />
            <View style={styles.Container} forceInset={{ top: 'always' }}>
                <View style={{ paddingHorizontal: 16.0 }}>
                    <Text style={{ fontWeight: '700', fontSize: 16 }}>Your Recent Downloads</Text>
                </View>
            </View>
        </View>
        </>
    );
}

export default Home

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
    Container: {
        flex: 1,
        backgroundColor: '#fcfcfc',
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
        borderRadius: 50.0,
        padding: 16.0,
        elevation: 12.0,
        zIndex: 100
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
    Message: {
        color: '#fff',
        fontSize: 20,
        textAlign: 'center',
        backgroundColor: 'red',
        paddingHorizontal: 16,
        paddingVertical: 10,
    },
})
const Banner = () => {
    const navigation = useNavigation();
    const BANNER = { uri: "https://raw.githubusercontent.com/byprogrammers/LCRN10-cryptocurrency-app-starter/master/assets/images/banner.png" };
    
    const [url, setUrl] = useState("")

    const PostReq = (url) => {
        console.log(url)
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
                    selectionColor="#333"
                    defaultValue={url}
                    onChangeText={(url) => setUrl(url)}
                />
                <Pressable
                    style={styles.Search}
                    onPress={() => { PostReq(url); }}
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