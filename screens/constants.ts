import RNFS from 'react-native-fs';
import { setDownloadedFileSize, setFilesize } from './REDUX/actions';
import { PayloadParams } from './types';


// Colours

export const kPrimaryColor = '#66f';
export const kBlueColor = '#0D6EFD';
export const kGreenColor = '#04AA6D';
export const kRedColor = '#DC3545';
export const kDarkTextColor = '#333';

// Asset Images

export const aBannerImage = require('./assets/img/banner.png');

// Other Functions

export const SAVE_FILE_TO = (filename: string): string => {return(`${RNFS.DownloadDirectoryPath}/UV Downloader/${filename}`)};

export const DownloadFileOptions = (payload: PayloadParams,dispatch: Function): RNFS.DownloadFileOptions => {
    return({
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
})}