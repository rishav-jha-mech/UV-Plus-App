import { FFmpegKit, ReturnCode } from 'ffmpeg-kit-react-native';
import { Alert } from 'react-native'
import { DOWNLOAD_PATH, pError, pLog, pPrettyPrint, SAVE_FILE_TO } from '../constants';
import { PayloadParams } from '../types';
import RNFS from 'react-native-fs';
import { downloadedSuccessfully, errorDownloading, setDownloadedFileSize, setFilesize, startDownloadingAudio, startDownloadingVideo, startMergingAudioVideo } from '../REDUX/DownloadSilce';


const DownloadVideoAudio = (payload: PayloadParams, dispatch: Function): void => {

    Alert.alert(
        '',
        'Download Started Check Downloading Tab For Progress'
    );
    const errorParams: raiseErrorParams = {
        id: payload.id,
        filename: payload.filename,
        dispatch: dispatch
    };
    const audioParams: PayloadParams = {
        id: payload.id,
        url: payload.bestAudio!.url,
        filename: `${payload.filename}.${payload.bestAudio?.ext}`
    };

    // Download Video
    RNFS.downloadFile(DownloadFileOptions(payload, dispatch)).promise
        .then(res => {
            if (res.statusCode == 200) {
                // START DOWNLOADING AUDIO
                dispatch(startDownloadingAudio({
                    id: payload.id
                }));
                // Download Audio
                RNFS.downloadFile(DownloadFileOptions(audioParams, dispatch)).promise
                    .then(res => {
                        // START DOWNLOADING AUDIO
                        if (res.statusCode == 200) {
                            dispatch(startMergingAudioVideo({
                                id: payload.id
                            }));
                            pLog('FFMPEG IS STARTING BITCHES')
                            pPrettyPrint({
                                'videoPath' : `"${DOWNLOAD_PATH}/${payload.filename}"`,
                                'audioPath' : `"${DOWNLOAD_PATH}/${audioParams.filename}"`,
                                'outputPath' : `${DOWNLOAD_PATH}/outputty.mp4`
                            })
                            FFmpegKit.execute(`-i "${DOWNLOAD_PATH}/${payload.filename}" -i "${DOWNLOAD_PATH}/${audioParams.filename}" -acodec copy -vcodec copy "${DOWNLOAD_PATH}/outputty.mp4"`).then(async (session) => {
                                const returnCode = await session.getReturnCode();

                                if (ReturnCode.isSuccess(returnCode)) {
                                    // SUCCESS
                                    pLog('FFMPEG => SUCCESS');

                                } else if (ReturnCode.isCancel(returnCode)) {

                                    // CANCEL
                                    pLog('FFMPEG => CANCEL');

                                } else {

                                    // ERROR
                                    pLog('FFMPEG => ERROR');
                                }
                            });
                        } else {
                            raiseError(errorParams)
                        }
                    }).catch(err => {
                        pError(`Error in Downloading Audio ${err}`);
                        raiseError(errorParams)
                    });


            } else {
                raiseError(errorParams)
            }
        }).catch(err => {
            pError(`Error in Downloading Video ${err}`);
            raiseError(errorParams)
        });
}

export default DownloadVideoAudio;

// Function to Dispatch Error Downloading
const raiseError = (params: raiseErrorParams) => {
    const { id, filename, dispatch } = params;
    dispatch(errorDownloading({
        id: id
    }));
    Alert.alert(
        'Error Occured',
        `Error Downloading ${filename}`
    );
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