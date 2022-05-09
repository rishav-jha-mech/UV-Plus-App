import RNFS from 'react-native-fs';

const fileExists = (path) => {

    RNFS.exists(RNFS.DownloadDirectoryPath + `/UV Downloader/${filename}`)
        .then((exists) => {
            if (exists) { 
                return true;
            }else{
                return false;
            }
        }).catch(err => {
            console.error(err);
            return false;
        })
    
}

export default fileExists
