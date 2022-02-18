// react-native-media-thumbnail may be used in future commits
import React, { useState, useEffect } from 'react'
import { StyleSheet, View, ScrollView, PermissionsAndroid, Text, TouchableOpacity, ActivityIndicator } from 'react-native'
import FileList from './Components/FileList';
import RNFetchBlob from 'rn-fetch-blob';
import PermissionNotGiven from './Components/PermissionNotGiven';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';

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
            var y = [...files].reverse(); // Reversed the array 
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
                    <TouchableOpacity style={styles.backBtn} onPress={() => { setLoading(true);PreviousPath(); }}>
                        <FontAwesomeIcon icon={faArrowLeft} size={20} color={"#ff156f"} />
                    </TouchableOpacity>
                    <Text style={styles.PathText}>
                        {shownPath}
                    </Text>
            </View>
            {loading ?
                <View style={{ backgroundColor: '#ff56', flex: 1, justifyContent: 'center', alignItems: 'center' }} >
                    <ActivityIndicator size={90} color={'#6f00ff'} />
                    <Text style={{ fontSize: 22, marginTop: 30, fontWeight: '700', letterSpacing: 0.7 }}>Loading Files</Text>
                </View>
                : (loading === false && filestats.length === 0) ?
                    <View style={{ backgroundColor: '#ff56', flex: 1, justifyContent: 'center', alignItems: 'center' }} >
                        <Text style={{ fontSize: 22, marginTop: 30, fontWeight: '700', letterSpacing: 0.7 }}>No Files Present</Text>
                    </View> :
                    <ScrollView>
                        
                        {filestats.map((data, index) => { // CalBack Function's second Param is the index
                            return (<FileList key={index} data={data} setthepath={(path) => setPath(path)} settheloading={(bools) => setLoading(bools)} />)
                        })}
                    </ScrollView>
            }
        </View>
    )
        : <PermissionNotGiven />
}

export default Downloads

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
    },
    Path: {
        backgroundColor: '#fff',
        display: 'flex',
        flexDirection: 'row',
        height: 50
    },
    PathText: {
        flex:1,
        color: '#ff156f',
        fontSize: 14,
        fontWeight: '700',
        letterSpacing: 0.5,
        paddingHorizontal: 16.0,
        paddingVertical: 16.0,
        overflow: 'hidden'
    },
    backBtn: {
        backgroundColor: 'lightblue',
        paddingHorizontal: 16.0,
        paddingVertical: 16.0
    },
})
