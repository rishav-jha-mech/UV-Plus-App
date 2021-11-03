import RNFetchBlob from 'rn-fetch-blob'
import WritePermission from './WritePermission'

const downloadFile = (url, title, ext, platform) => {

    const navigation = useNavigation();

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
        config(options).fetch('GET', url,{'Cache-Control' : 'no-store','Transfer-Encoding':'Chunked'})
            .then(res => {
                console.log('response -> ', JSON.stringify(res,null,4))
                alert("Media Downloaded Successfully")
                navigation.navigate("Home")
            })
            .catch(error =>{
                alert("Can't download th File directly, click on the three dots button to download the file.\n\nThe file will be stored in the Downloads Folder of your device")
                navigation.navigate("Web",{
                    url: url
                })
                console.error(error)
            })
    }
}

export default downloadFile