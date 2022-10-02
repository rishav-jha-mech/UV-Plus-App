import { Alert } from 'react-native'
import { pError, SAVE_FILE_TO } from '../constants';
import { PayloadParams } from '../types';
import RNFS from 'react-native-fs';
import { downloadedSuccessfully, errorDownloading, setDownloadedFileSize, setFilesize } from '../REDUX/DownloadSilce';


const StartDownload = (payload: PayloadParams, dispatch: Function): void => {

    Alert.alert("Download Started Check Notification For Progress");
    const errorParams: raiseErrorParams = {
        id: payload.id,
        filename: payload.filename,
        dispatch: dispatch
    };

    RNFS.downloadFile(DownloadFileOptions(payload, dispatch)).promise
        .then(res => {
            // Check the comments below
            if (res.statusCode == 200) {
                Alert.alert(payload.filename + ' Was Downloaded Successfully')
                dispatch(downloadedSuccessfully({
                    id: payload.id
                }));
            } else {
                raiseError(errorParams)
            }
        }).catch(err => {
            pError(err);
            raiseError(errorParams)
        });
}

export default StartDownload;

// Function to Dispatch Error Downloading
const raiseError = (params: raiseErrorParams) => {
    const { id, filename, dispatch } = params;

    dispatch(errorDownloading({
        id: id
    }));
    Alert.alert('Error occured while downloading' + filename);
}

// Function to Create Download File Options
const DownloadFileOptions = (payload: PayloadParams, dispatch: Function): RNFS.DownloadFileOptions => {
    return ({
        fromUrl: payload.url,
        toFile: SAVE_FILE_TO(payload.filename),
        progressInterval: 100,
        progressDivider: 1,
        begin: (res: RNFS.DownloadBeginCallbackResult) => {
            dispatch(setFilesize({
                id: payload.id,
                fileSize: res.contentLength,
            }));
        },
        progress: (res: RNFS.DownloadProgressCallbackResult) => {
            dispatch(setDownloadedFileSize({
                id: payload.id,
                downSize: res.bytesWritten
            }));
        },
    })
}


type raiseErrorParams = {
    id: string,
    filename: string,
    dispatch: Function
}