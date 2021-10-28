import RNFetchBlob from 'rn-fetch-blob'
import { PermissionsAndroid, Alert } from 'react-native'

// rnfetch blobover here is giving circular import error
const downloadFile = async (title, url, ext) => {
    try {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
            {
                title: "Storage Permission Required",
                message: "App needs access to your storage to download files"
            })
        if (granted == PermissionsAndroid.RESULTS.GRANTED) {
            console.log("Storage Permission Granted")
            // Get config and fs from rnfetchblob
            const { config, fs } = RNFetchBlob
            let PictureDir = fs.dirs.DownloadDir
            let options = { 
                fileCache: true,
                addAndroidDownloads: {
                    title: title,
                    useDownloadManager: true,
                    notification: true,
                    path: `${PictureDir}/${title}.${ext}`,
                    description: 'Media',
                },
            }
            config(options).fetch('GET', url)
                .then(res => {
                    console.log('response -> ', JSON.stringify(res))
                    Alert.alert(
                        '', // i dont want any title over here
                        `${title}.${ext}\n\n\n Downloaded Successfully !`,
                        [
                           {text: 'OK'},
                        ],
                        { cancelable: true }
                        )
                })

        } else {
            alert("Storage Permission Not granted")
        }
    } catch (error) {
        console.log(error)
    }
}

export default downloadFile