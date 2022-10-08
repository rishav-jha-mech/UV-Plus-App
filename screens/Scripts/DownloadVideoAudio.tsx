import { FFmpegKit, ReturnCode } from 'ffmpeg-kit-react-native';
import { Alert } from 'react-native'
import { DOWNLOAD_PATH, pError, pLog, pPrettyPrint, SAVE_FILE_TO } from '../constants';
import { FFMPEG_PARAMS, PayloadParams } from '../types';
import RNFS from 'react-native-fs';
import { downloadedSuccessfully, errorDownloading, setAudioFilesize, setDownloadedFileSize, setDownloadedFileSizeAudio, setFilesize, startDownloadingAudio, startDownloadingVideo, startMergingAudioVideo } from '../REDUX/DownloadSilce';
import deleteFile from './deleteFile';
import FileExists from './fileExists';


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
    const ffmpegParams: FFMPEG_PARAMS = {
        videoPath: `"${DOWNLOAD_PATH}/${payload.filename}"`,
        audioPath: `"${DOWNLOAD_PATH}/${audioParams.filename}"`,
        outputPath: `"${DOWNLOAD_PATH}/sa${payload.filename}"`,
    }

    // Download Video
    RNFS.downloadFile(DownloadFileOptionsVideo(payload, dispatch)).promise
        .then(res => {
            if (res.statusCode == 200) {
                // START DOWNLOADING AUDIO
                dispatch(startDownloadingAudio({
                    id: payload.id
                }));
                // Download Audio
                RNFS.downloadFile(DownloadFileOptionsAudio(audioParams, dispatch)).promise
                    .then(res => {
                        // START DOWNLOADING AUDIO
                        if (res.statusCode == 200) {
                            dispatch(startMergingAudioVideo({
                                id: payload.id
                            }));
                            pPrettyPrint(ffmpegParams);
                            FFmpegKit.execute(`-i ${ffmpegParams.videoPath} -i ${ffmpegParams.audioPath} -acodec copy -vcodec copy ${ffmpegParams.outputPath}`).then(async (session) => {
                                const returnCode = await session.getReturnCode();
                                if (ReturnCode.isSuccess(returnCode)) {
                                    dispatch(downloadedSuccessfully({
                                        id: payload.id
                                    }));
                                } else {
                                    raiseError(errorParams);
                                }
                            }).then((res) => {
                                pLog(`THEN RES => ${res}`);
                            }).catch((error) => {
                                pError(error);
                                raiseError(errorParams);
                            }).finally(() => {
                                FileExists(`${DOWNLOAD_PATH}/${payload.filename}`).then(res => res ? deleteFile(`${DOWNLOAD_PATH}/${payload.filename}`) : null);
                                FileExists(`${DOWNLOAD_PATH}/${audioParams.filename}`).then(res => res ? deleteFile(`${DOWNLOAD_PATH}/${audioParams.filename}`) : null);
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

// USED FOR DOWNLOADING VIDEO
const DownloadFileOptionsVideo = (payload: PayloadParams, dispatch: Function): RNFS.DownloadFileOptions => {
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

// USED FOR DOWNLOADING AUDIO
const DownloadFileOptionsAudio = (payload: PayloadParams, dispatch: Function): RNFS.DownloadFileOptions => {
    return ({
        fromUrl: payload.url,
        toFile: SAVE_FILE_TO(payload.filename),
        progressInterval: 100,
        progressDivider: 1,
        begin: (res: RNFS.DownloadBeginCallbackResult) => {
            dispatch(setAudioFilesize({
                id: payload.id,
                audioFileSize: res.contentLength,
            }));
        },
        progress: (res: RNFS.DownloadProgressCallbackResult) => {
            dispatch(setDownloadedFileSizeAudio({
                id: payload.id,
                audioDownSize: res.bytesWritten
            }));
        },
    })
}


type raiseErrorParams = {
    id: string,
    filename: string,
    dispatch: Function
}