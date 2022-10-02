import RNFS from 'react-native-fs';
import { setDownloadedFileSize, setFilesize } from './REDUX/actions';
import { PayloadParams } from './types';


// Colours

export const kPrimaryColor = '#66f';
export const kBlueColor = '#0D6EFD';
export const kGreenColor = '#04AA6D';
export const kRedColor = '#DC3545';
export const kDarkTextColor = '#333';

// Print Statements

export const pPrettyPrint = (arg?: any): void => console.log(JSON.stringify(arg, null, 4));
export const pLog = (arg?: any): void => console.log(arg);
export const pWarn = (arg?: any): void => console.warn(arg);
export const pError = (arg?: any): void => console.error(arg);

// Asset Images

export const aBannerImage = require('./assets/img/banner.png');

// Other Functions

export const SAVE_FILE_TO = (filename: string): string => {return(`${RNFS.DownloadDirectoryPath}/UV Downloader/${filename}`)};
