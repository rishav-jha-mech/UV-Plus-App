import RNFetchBlob from 'rn-fetch-blob'
import { PermissionsAndroid, Alert } from 'react-native' // I have to ask this on the App.js part or Honme Page only or this will continue throwing me circular errors for 3*2 lines everytime
// Console Logs are for debugging only they will not be there in the final code
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
            let date = new Date()
            let media_url = url
            // Get config and fs from rnfetchblob
            const { config, fs } = RNFetchBlob
            let PictureDir = fs.dirs.DownloadDir
            let options = { // This is the header file in future versions we have to put the auth creds of the user here so that the user can access files from private accounts and private groups
                fileCache: true,// Highly performant, directly saves to file
                addAndroidDownloads: {
                    title: title,
                    useDownloadManager: true,
                    notification: true,
                    path: `${PictureDir}/${title}.${ext}`,
                    description: 'Media',
                },
            }
            config(options).fetch('GET', media_url)
                // listen to download progress event, every 10%
                .progress((received, total) => {
                    console.log('progress', received / total)
                })
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