// react-native-media-thumbnail may be used in future commits
import React, { useState, useEffect } from 'react'
import { StyleSheet, View, ScrollView, PermissionsAndroid, Text, TouchableOpacity } from 'react-native'
import FileList from './Components/FileList';
import RNFetchBlob from 'rn-fetch-blob';
import PermissionNotGiven from './Components/PermissionNotGiven';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const FileNavigation = ( { route } ) => {

    const PATH_PARAM = route.params.path

    const [filestats, setFileStats] = useState([])
    const [readPerm, setReadPerm] = useState(true)
    const [path, setpath] = useState(PATH_PARAM)

    PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE).then(res => { setReadPerm(res) })

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
    }
    const PreviousPath = () => {
        var local = path;
        console.log("Before =>  ", local)
        local = local.slice(0, local.lastIndexOf('/') + 1)
        console.log("After =>  ", local)
        setpath(local)
    }
    var shownPath = path
    shownPath = shownPath.slice((shownPath.indexOf(0)), shownPath.length)

    // console.log("Actual Path => ", path)
    // console.log(JSON.stringify(filestats,null,4))

    return readPerm ? (
        <View style={styles.Container}>
            <View style={styles.Path}>
                <TouchableOpacity style={styles.backBtn} onPress={() => PreviousPath()}>
                    <FontAwesomeIcon icon={faArrowLeft} size={20} color={"#ff156f"} />
                </TouchableOpacity>
                <Text style={styles.PathText}>
                    {shownPath}
                </Text>
            </View>
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

export default FileNavigation

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
