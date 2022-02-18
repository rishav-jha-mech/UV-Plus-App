// react-native-media-thumbnail may be used in future commits
import React, { useState, useEffect } from 'react'
import { StyleSheet, View, ScrollView, PermissionsAndroid, Text, TouchableOpacity, ActivityIndicator, FlatList } from 'react-native'
import FileList from './Components/FileList';
import RNFetchBlob from 'rn-fetch-blob';
import PermissionNotGiven from './Components/PermissionNotGiven';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const Downloads = () => {

    var FILEPATH = RNFetchBlob.fs.dirs.DownloadDir;
    const [filestats, setFileStats] = useState([]);
    const [readPerm, setReadPerm] = useState(true);
    const [path, setPath] = useState((FILEPATH + '/UV Downloader'));
    const [loading, setLoading] = useState(true);
    PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE).then(res => { setReadPerm(res) });

    useEffect(() => {
        setLoading(true);
        ReadFiles();
    }, [path]) // When path changes component will re render

    const ReadFiles = () => {
        RNFetchBlob.fs.lstat(path).then(files => {
            var y = [... files].reverse(); // Reversed the array 
            // console.log(JSON.stringify(y,0,4))
            setFileStats(y)
            setLoading(false)
        })
            .catch(err => {
                console.log(err);
            });
    }
    const PreviousPath = () => { // Implementing the previous folder file system
        var local = path;
        local = local.slice(0, local.lastIndexOf('/'))
        setPath(local)
    }
    var shownPath = path
    shownPath = shownPath.slice((shownPath.indexOf(0)), shownPath.length)

    return readPerm ? (
        <View style={styles.Container}>
            <View style={styles.Path}>
                {loading ? // So that user does not click 2-3 times on the same button
                    <TouchableOpacity style={styles.backBtn}>
                        <ActivityIndicator size={20} color={'#66f'} />
                    </TouchableOpacity>
                    : (shownPath === "0") ? <></> : // Or the app will get 'crashed' if the user tries to go before this path
                        <TouchableOpacity style={styles.backBtn} onPress={() => { setLoading(true); PreviousPath(); }}>
                            <FontAwesomeIcon icon={faArrowLeft} size={20} color={"#66f"} />
                        </TouchableOpacity>
                }
                <Text style={styles.PathText}>
                    {shownPath.replace('0','Home')}
                </Text>
            </View>
            {loading ?
                <View style={styles.BlankFilePage} >
                    <ActivityIndicator size={90} color={'#66f'} />
                    <Text style={{ fontSize: 22, marginTop: 30, fontWeight: '700', letterSpacing: 0.7 }}>Loading Files</Text>
                </View>
                : (loading === false && filestats.length === 0) ?
                    <View style={styles.BlankFilePage} >
                        <Text style={{ fontSize: 22, marginTop: 30, fontWeight: '700', letterSpacing: 0.7 }}>No Files Present</Text>
                    </View> : 
                    <FlatList 
                        data={filestats}
                        renderItem={(info) => {
                            return (
                                <FileList key={info.index} data={info.item} setthepath={(path) => setPath(path)} settheloading={(bools) => setLoading(bools)} />
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
        overflow: 'hidden'
    },
    backBtn: {
        paddingHorizontal: 16.0,
        paddingVertical: 16.0
    },
    BlankFilePage:{
        backgroundColor: '#fcfafa',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})
