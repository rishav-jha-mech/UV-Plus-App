// react-native-media-thumbnail may be used in future commits
import React, { useState, useEffect } from 'react'
import { StyleSheet, View, ScrollView, PermissionsAndroid } from 'react-native'
import FileList from './Components/FileList';
import RNFetchBlob from 'rn-fetch-blob';
import PermissionNotGiven from './Components/PermissionNotGiven';

const Downloads = () => {

    const FILEPATH = RNFetchBlob.fs.dirs.DownloadDir + '/UV Downloader'
    const [filestats, setFileStats] = useState([])
    const [readPerm, setReadPerm] = useState(true)

    PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE).then(res => { setReadPerm(res) })

    useEffect(() => {
        ReadFiles();
    }, [])

    const ReadFiles = () =>{
        console.log("Reading FIles")
        RNFetchBlob.fs.lstat(FILEPATH).then(files => {
            var y = [...files].reverse(); // Reversed the array 
            setFileStats(y)
        })
            .catch(err => {
                console.log(err);
            });
    }

    return readPerm ? (
        <View style={styles.Container}>
            <ScrollView>
                {filestats.map((data, index) => { // CalBack Function's second Param is the index
                    return (<FileList key={index} data={data} />)
                })}
            </ScrollView>
        </View>
    )
        :
        <PermissionNotGiven />
}

export default Downloads

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
    },
})
