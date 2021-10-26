import React from 'react'
import { StyleSheet, Text, View, Image, Button, PermissionsAndroid, Platform } from 'react-native'
import RNFetchBlob from 'rn-fetch-blob'

const Downloading = () => {

    const Media_Url = ""

    const checkPermission = async () =>{
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                    {
                        title: "Storage Permission Required",
                        message : "App needs access to your storage to download files"
                    })
                    if (granted == PermissionsAndroid.RESULTS.GRANTED) {
                        console.log("Storage Permission Granted")
                        downloadImage();
                    }else{
                        alert("Storage Permission Not granted")
                    }
            } catch (error) {
                console.log(error)
            }
    }
    const downloadImage = () =>{
        let date = new Date()
        let media_url = Media_Url
        // Get config and fs from rnfetchblob
        const {config,fs} = RNFetchBlob
        let PictureDir = fs.dirs.DCIMDir
        let options = { // This is the header file in future versions we have to put the auth creds of the user here so that the user can access files from private accounts and private groups
            fileCache:true,// Highly performant, directly saves to file
            addAndroidDownloads: {
                useDownloadManager: true,
                notification:true,
                path: PictureDir + '/media_' +
                Math.floor(date.getTime() + date.getSeconds() /2),
                description:'Media',
            },
            appendExt: 'mp4' // This will be a parameter for this function
        }
        config(options).fetch('GET',media_url)
        .then(res =>{
            console.log('response -> ',JSON.stringify(res))
            alert("Image Downloaded Successfully")
        })
    }
    return (
        <View style={styles.Container}>
            <Button title="Download Media" onPress={checkPermission}/>
        </View>
    )
}

export default Downloading

const styles = StyleSheet.create({
    Container:{
        flex:1,
        backgroundColor:'#ff56',
        justifyContent:'center',
        alignItems:'center'
    },
    TheImage:{
        width:'100%',
        minHeight:300,
        marginVertical:20
    }
})