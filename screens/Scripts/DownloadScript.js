import RNFetchBlob from 'rn-fetch-blob'
import { PermissionsAndroid,useState } from 'react-native'
const downloadFile = async (url,title,ext) => {

    try {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
            {
                title: "Storage Permission Required",
                message: "App needs access to your storage to download files"
            })
        if (granted == PermissionsAndroid.RESULTS.GRANTED) {
            console.log("Storage Permission Granted")
            const PATH = RNFetchBlob.fs.dirs.DownloadDir + '/UV Downloader/' + title + '.'  + ext
            // Get config and fs from rnfetchblob
            const { config, fs } = RNFetchBlob
            let PictureDir = fs.dirs.DownloadDir
            let options = { 
                fileCache: true,
                addAndroidDownloads: {
                    title: title,
                    useDownloadManager: true,
                    notification: true,
                    path: PATH,
                    description: 'Media',
                },
            }
            config(options).fetch('GET', url)
                .then(res => {
                    console.log('response -> ', JSON.stringify(res,null,4))
                    setDownloading(false)
                })

        } else {
            alert("Storage Permission Not granted")
        }
    } catch (error) {
        console.log(error)
    }
}

export default downloadFile