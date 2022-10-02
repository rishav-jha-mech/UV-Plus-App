// react-native-media-thumbnail may be used in future commits
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, BackHandler, PermissionsAndroid, Text, TouchableOpacity, ActivityIndicator, FlatList, RefreshControl } from 'react-native';
import FileList from './FileList';
import { useNavigation } from '@react-navigation/native';
import RNFS from 'react-native-fs';
import PermissionNotGiven from '../../Components/PermissionNotGiven';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import Loading from '../../Components/Loading';
import { FlashList } from '@shopify/flash-list';

const Downloads = () => {

    const FILEPATH = RNFS.DownloadDirectoryPath;
    const [filestats, setFileStats] = useState([]);
    const navigation = useNavigation();
    const [readPerm, setReadPerm] = useState(true);
    const [path, setPath] = useState((FILEPATH + '/UV Downloader'));
    const [loading, setLoading] = useState(true);
    const canGoBackward = true;
    PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE).then(res => { setReadPerm(res) });

    useEffect(() => {
        setLoading(true);
        ReadFiles();
    }, [path])

    const ReadFiles = () => {
        RNFS.readDir(path).then(files => {
            var y = [...files].reverse(); // Reversed the array 
            setFileStats(y)
            setLoading(false)
        })
            .catch(err => {
                // Making the App Downloads folder if it doesnt exist
                RNFS.mkdir(path)
                    .then(() => { ReadFiles(); })
                    .catch((err) => { console.error(err) })
            });
    }
    const PreviousPath = () => { // Implementing the previous folder file system
        var local = path;
        local = local.slice(0, local.lastIndexOf('/'))
        setPath(local)

    }
    var shownPath = path
    shownPath = shownPath.slice((shownPath.indexOf(0)), shownPath.length)

    // Backhandlers
    const backAction = () => {
        if (shownPath === '0') { // In  future this will be applied to android directory too so that the app doesnt crash
            navigation.navigate('Home')
            return true;
        }
        if (canGoBackward) {
            setLoading(true);
            PreviousPath();
        }
        return true;
    };
    BackHandler.addEventListener(
        "hardwareBackPress",
        backAction
    );

    // Here if the user is on the root directory the back button is hidden so it wont work, lso if the user clicks on hardware back btn
    // her will be forwarded to home
    return readPerm ? (
        <View style={styles.Container}>
            <View style={styles.Path}>
                {loading ? // So that user does not click 2-3 times on the same button
                    <TouchableOpacity style={styles.backBtn}>
                        <ActivityIndicator size={20} color={'#66f'} />
                    </TouchableOpacity>
                    : (shownPath === "0") ? <></> : // Or the app will get 'crashed' if the user tries to go before this path
                        <TouchableOpacity style={styles.backBtn} onPress={() => { setLoading(true); PreviousPath(); }}>
                            <FontAwesomeIcon name='angle-left' size={20} color={"#66f"} />
                        </TouchableOpacity>
                }
                <Text style={styles.PathText}>
                    {shownPath.replace('0', 'Home')}
                </Text>
            </View>
            {loading ?
                <Loading />
                : (loading === false && filestats.length === 0) ?
                    <View style={styles.BlankFilePage} >
                        <Text style={{ fontSize: 22, marginTop: 30, fontWeight: '700', letterSpacing: 0.7 }}>No Files Present</Text>
                    </View> :
                    <FlashList
                        data={filestats}
                        refreshControl={
                            <RefreshControl
                                refreshing={loading}
                                onRefresh={() => {
                                    setLoading(true);
                                    ReadFiles();
                                }}
                            />
                        }
                        estimatedItemSize={100}
                        renderItem={(info) => {
                            return (
                                <FileList key={info.index} data={info.item} reload={() => { ReadFiles(); setLoading(true) }} setthepath={(path) => {setPath(path); setLoading(true)}} />
                            );
                        }}
                    />
            }
        </View>
    )
        : <PermissionNotGiven />
}

export default Downloads

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: '#fcfafa',
        justifyContent: 'center',
    },
    Path: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        height: 52.0,
        borderBottomColor: 'rgba(0,0,0,0.075)',
        borderBottomWidth: 1.5
    },
    PathText: {
        flex: 1,
        color: '#66f',
        fontSize: 16.0,
        fontWeight: '500',
        letterSpacing: 0.5,
        paddingHorizontal: 16.0,
        paddingVertical: 16.0,
        overflow: 'hidden',
        height: 52.0
    },
    backBtn: {
        paddingHorizontal: 16.0,
        paddingVertical: 16.0
    },
    BlankFilePage: {
        backgroundColor: '#fcfafa',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})
