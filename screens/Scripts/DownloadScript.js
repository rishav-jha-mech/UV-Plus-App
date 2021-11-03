import RNFetchBlob, { RNFetchBlobFile } from 'rn-fetch-blob'
import WritePermission from './WritePermission'

const downloadFile = (url, title, ext, platform) => {

    const SAVE_FILE_TO = RNFetchBlob.fs.dirs.DownloadDir + "/UV Downloader/"
    var FileName = `${title}.${ext}`

    if (platform=="fb"){FileName=`Facebook Media.${ext}`}

    if (WritePermission()){
        const { config, fs } = RNFetchBlob
        let options = { 
            fileCache: true,
            addAndroidDownloads: {
                title: (title + '.' + ext),
                useDownloadManager: true,
                notification: true,
                path: (SAVE_FILE_TO + FileName),
                description: 'Media',
            },
        }
        config(options).fetch('GET', url)
            .then(res => {
                console.log('response -> ', JSON.stringify(res,null,4))
                alert("Media Downloaded Successfully")
            })
            .catch(error =>{
                alert(error)
            })
    }
}

export default downloadFile