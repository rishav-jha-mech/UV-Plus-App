import RNFS from 'react-native-fs';
import { Alert } from 'react-native'
import { startDownloading, startDownloadingVideo } from '../REDUX/DownloadSilce';
import { FormatType, PayloadParams } from '../types';
import DownloadVideoAudio from './DownloadVideoAudio';

const CheckAndDownloadBothVideoAndAudio = (title: string, ext: string, urlVideo: string, dispatch: Function, navigation: any, bestAudio: FormatType) => {
    const filename = `${title}.${ext}`.replace(/[/\\?%*:|"<>]/g, '-');

    RNFS.exists(RNFS.DownloadDirectoryPath + `/UV Downloader/${filename}`)
        .then((exists) => {
            if (exists) {
                Alert.alert('Error', `${filename} already exists, thus cannot be downloaded. Delete that file and try again`)
            } else {
                const time = new Date();
                const id = time.toISOString();
                const params: PayloadParams = {
                    id: id,
                    url: urlVideo,
                    filename: filename,
                    bestAudio: bestAudio,
                };
                dispatch(startDownloadingVideo(params));
                DownloadVideoAudio(params, dispatch);
                navigation.navigate('Downloading'); // This may cause error
            }
        });
}

export default CheckAndDownloadBothVideoAndAudio