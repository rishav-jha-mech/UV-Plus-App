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
        ReadFiles();
    }, [path]) // When path changes component will re render

    const ReadFiles = () => {
        console.log("Reading FIles....")
        RNFetchBlob.fs.lstat(path).then(files => {
            var y = [...files].reverse(); // Reversed the array 
            setFileStats(y)
        })
            .catch(err => {
                console.log(err);
            });
        console.log("Completed Reading Files");
        setLoading(false)
    }
    const PreviousPath = () => { // Implementing the previous folder file system
        setLoading(true)
        var local = path;
        local = local.slice(0, local.lastIndexOf('/'))
        setPath(local)
    }
    var shownPath = path
    shownPath = shownPath.slice((shownPath.indexOf(0)), shownPath.length)

    // console.log("Actual Path => ", path)
    // console.log(JSON.stringify(filestats,null,4))
    console.log(loading)
    return readPerm ? (
        <View style={styles.Container}>
            <View style={styles.Path}>
                <TouchableOpacity style={styles.backBtn} onPress={() => { PreviousPath(); console.log("Previous Clicked") }}>
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
                : (filestats.length === 0) ?
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
        paddingHorizontal: 16,
        paddingVertical: 16,
    },
    PathText: {
        color: '#ff156f',
        fontSize: 14,
        fontWeight: '700',
        letterSpacing: 0.5,
        textAlign: 'center'
    },
    backBtn: {
        position: 'absolute',
        paddingHorizontal: 16,
        paddingVertical: 16,
        backgroundColor: 'lightblue'
    },
})
