import React, { useState, createRef, useEffect } from 'react';
import FeatherIcon from 'react-native-vector-icons/Feather'

import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, View, TextInput, ImageBackground, Pressable } from 'react-native';
import isURL from 'validator/lib/isURL';
import { aBannerImage, kPrimaryColor } from '../../constants';
import { StackNavigationProp } from '@react-navigation/stack';
import { AppParamList } from '../../NAVIGATION';
import StorageLeft from '../../Scripts/storageLeft';


type resultStackProps = StackNavigationProp<AppParamList, 'ResultStack'>;
type webStackProps = StackNavigationProp<AppParamList, 'WebStack'>;


const Banner = () => {

    const [url, setUrl] = useState<string>("")
    const resultStack = useNavigation<resultStackProps>();
    const webStack = useNavigation<webStackProps>();
    const [storageStat, setStorageStat] = useState<string>('')

    const inputRef = createRef<TextInput>();
    const PostReq = (url: string) => {
        if (isURL(url)) {
            resultStack.navigate('ResultStack', {
                url: url,
            });
        } else {
            // What's the point of annoying the users by alerting them their url is incorrect ?, instead redirect them to Google
            // So if url is okay then send them to my server
            // Else if its not event a url send it to Google Search
            webStack.navigate('WebStack', {
                url: `https://www.google.com/search?q=${url}`
            })
        }
    }
    useEffect(() => {
        StorageLeft().then((res: string) => setStorageStat(res))
    }, [])
    
    return (<>
        <View style={styles.Banner}>
            <Text style={styles.storageStat}>{storageStat}</Text>
            <ImageBackground source={aBannerImage} style={styles.BannerImageBG} resizeMode={"cover"} >
                <Text style={styles.NavbarText}>Universal Downloader</Text>
            </ImageBackground>
            <View style={styles.urlContainer}>
                <TextInput
                    style={styles.Input}
                    ref={inputRef}
                    placeholder="Enter url or search"
                    keyboardType="url"
                    defaultValue={url}
                    showSoftInputOnFocus={true}
                    onPressIn={() => { inputRef.current?.focus() }}
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
        height: 275,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: kPrimaryColor,
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
        color: '#fff',
        marginBottom: -16.0
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
        backgroundColor: kPrimaryColor,
        borderRadius: 25,
    },
    storageStat:{
        position: 'absolute',
        zIndex: 100,
        top:   6.0,
        right: 6.0,
        color: 'rgba(256,256,256,0.8)',
        fontSize: 13.0,
    }
})