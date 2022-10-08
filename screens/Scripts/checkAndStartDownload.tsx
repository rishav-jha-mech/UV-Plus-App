import RNFS from 'react-native-fs';
import { Alert } from 'react-native';
import { startDownloading } from "../REDUX/DownloadSilce";
import StartDownload from './Download';

const CheckAndStartDownloading = (title: string, ext: string, url: string, dispatch: Function, navigation: any) => {
    const filename = `${title}.${ext}`.replace(/[/\\?%*:|"<>]/g, '-');

    RNFS.exists(RNFS.DownloadDirectoryPath + `/UV Downloader/${filename}`)
        .then((exists) => {
            if (exists) {
                Alert.alert('Error',`${filename} already exists, thus cannot be downloaded. Delete that file and try again`)
            } else {
                const time = new Date();
                const id = time.toISOString();
                const params = {
                    id: id,
                    url: url,
                    filename: filename
                };
                dispatch(startDownloading(params));
                StartDownload(params, dispatch);
                navigation.navigate('Downloading'); // This may cause error
            }
        });
}
export default CheckAndStartDownloading;