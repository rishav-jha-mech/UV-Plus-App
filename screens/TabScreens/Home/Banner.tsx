import React, { createRef, useEffect, useState, useRef } from 'react';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { AppState } from 'react-native';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import isURL from 'validator/lib/isURL';
import { AppParamList } from '../../NAVIGATION';
import StorageLeft from '../../Scripts/storageLeft';
import { Colors } from '../../constants';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import t from 'twrnc'


type resultStackProps = NativeStackNavigationProp<AppParamList, 'ResultStack'>;
type webStackProps = NativeStackNavigationProp<AppParamList, 'WebStack'>;


const Banner = () => {

    const [url, setUrl] = useState<string>("")
    const resultStack = useNavigation<resultStackProps>();
    const webStack = useNavigation<webStackProps>();
    const navigation = useNavigation();
    const [storageStat, setStorageStat] = useState<string>('')

    const inputRef = createRef<TextInput>();

    const appState = useRef(AppState.currentState);
    useEffect(() => {
        const subscription = AppState.addEventListener('change', nextAppState => {
            if (
                appState.current.match(/inactive|background/) &&
                nextAppState === 'active'
            ) {

            }

            appState.current = nextAppState;
            console.log('AppState', appState.current);
        });

        return () => {
            subscription.remove();
        };
    }, []);

    const PostReq = (url: string) => {
        if (isURL(url)) {
            resultStack.navigate('ResultStack', {
                url: url,
            });
        } else {
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
            <TouchableOpacity
                style={t`absolute p-3 top-0 left-0`}
                onPress={() => {
                    navigation.dispatch(DrawerActions.openDrawer())
                }}
            >
                <FeatherIcon
                    name='menu'
                    size={32}
                    color={Colors.WhiteColor}
                />
            </TouchableOpacity>
            <Text style={styles.NavbarText}>Universal Downloader</Text>
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
        backgroundColor: Colors.PrimaryColor,
        borderBottomRightRadius: 6,
        borderBottomLeftRadius: 6,
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
        backgroundColor: Colors.PrimaryColor,
        borderRadius: 25,
    },
    storageStat: {
        position: 'absolute',
        zIndex: 100,
        top: 6.0,
        right: 6.0,
        color: 'rgba(256,256,256,0.8)',
        fontSize: 13.0,
    }
})