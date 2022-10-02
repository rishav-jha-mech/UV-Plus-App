import RNFS from 'react-native-fs';


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

// Paths

export const DOWNLOAD_PATH:string = RNFS.DownloadDirectoryPath + '/UV Downloader';



// Other Functions

export const SAVE_FILE_TO = (filename: string): string => {return(`${RNFS.DownloadDirectoryPath}/UV Downloader/${filename}`)};

export const supWebsites = [
    {
        name: 'Youtube',
        url: 'https://youtube.com',
        icon: 'youtube',
        size: 35,
        colors: ['#FF0000', 'red'],
        color: '#fff'
    },
    {
        name: 'Facebook',
        url: 'https://facebook.com',
        icon: 'facebook',
        size: 35,
        colors: ['#3b5998', '#3b5998'],
        color: '#fff'

    },
    {
        name: 'Instagram',
        url: 'https://instagram.com',
        icon: 'instagram',
        size: 35,
        colors: ['#feda75', '#fa7e1e', '#d62976', '#962fbf', '#4f5bd5'],
        color: '#fff'
    },
    {
        name: 'Twitter',
        url: 'https://twitter.com',
        icon: 'twitter',
        size: 35,
        colors: ['#1DA1F2', '#1DA1F2'],
        color: '#fff'
    },
];