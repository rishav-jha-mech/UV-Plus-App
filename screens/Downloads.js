// react-native-media-thumbnail may be used in future commits
import React, { useState, useEffect } from 'react'
import { StyleSheet, View, ScrollView } from 'react-native'
import FileList from './Components/FileList';
import RNFetchBlob from 'rn-fetch-blob';

const Downloads = () => {

    const FILEPATH = RNFetchBlob.fs.dirs.DownloadDir + '/UV Downloader'

    const [filestats, setFileStats] = useState([])

    useEffect(() => {
        RNFetchBlob.fs.lstat(FILEPATH).then(files => {          
            setFileStats(files)
        })
            .catch(err => {
                // console.log(err.message, err.code);
            });
    }, [])
    return (
        <View style={styles.Container}>
            <ScrollView>
                {filestats.map((data, index) => { // CalBack Function's second Param is the index
                    return (<FileList key={index} data={data} />)

                })}
            </ScrollView>
        </View>
    )
}

export default Downloads

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
    },
})

/*
1. Step one download animation showing (0% to 100%) ✅ In the previous commit
2. The files will be displayed in a flat list or ScrollView => Object.map(<View></View>)
3. The files will have an id ofc
    first we need to read the files ✅ This will be done in this commit
    then each file will have
        an id ✅
        filename => of two lines max ✅
        filesize ✅
        foramat ✅
        date downloaded ✅
        status = ['downloaded','downloading']
        an options button
            to rename the file
            to delete the file
            to share the file
4. On clicking the file (Audio/Video) it will be opened in the App itself
5. the file having the downloading status will have a hook  recieved / total

    here recieved will be updated everytime its changed
6. Last but not the least the files will be sorted in a manner that the file which is being downloaded will sray on top

Lets Start Coding ! 🥶🥶🥶🥶🥶
*/