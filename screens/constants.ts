import RNFS from 'react-native-fs';;
import { StyleSheet, Dimensions } from 'react-native';


// Colours

export const kPrimaryColor = '#6666ff';
export const kSecondaryColor = '#ffff66';
export const kBlueColor = '#0D6EFD';
export const kGreenColor = '#04AA6D';
export const kRedColor = '#DC3545';
export const kDarkTextColor = '#333';
export const kBrightRed = '#ffdedb';


// Styles

export const SCREEN_HEIGHT = Dimensions.get('screen').height;
export const SCREEN_WIDTH = Dimensions.get('screen').width;
export const modalStyle = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.3)',
        alignItems: 'center',
        justifyContent: 'center'
    },
    Card: {
        backgroundColor: '#fff',
        minHeight: '30%',
        minWidth: '65%',
        borderRadius: 16,
        elevation: 8,
    },
    CardGeneric:{
        backgroundColor: '#fff',
        minHeight: '20%',
        width: '80%',
        borderRadius: 12,
        elevation: 3,
        padding: 16,
        justifyContent: 'center',
        alignItems: 'center'
    },
    Button: {
        marginVertical: 6,
        backgroundColor: 'rgba(30, 143, 255,0.15)',
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderRadius: 6,
        borderWidth: 0.6,
        borderColor: '#ddd'
    },
    ButtonText: {
        fontSize: 16,
        fontWeight: '700',
        textAlign: 'center',
        color: 'dodgerblue'
    },
    CardText:{
        fontSize: 16,
        color: kDarkTextColor,
        fontWeight: '400',
        textAlign: 'center',
        paddingVertical: 16
    },
    Input:{
        borderColor: kPrimaryColor,
        borderWidth: 1,
        width: '100%',
        borderRadius: 8.0,
        paddingHorizontal: 12,
    },
    h1:{
        color: kDarkTextColor,
        fontSize: 24,
        fontWeight: '700',
        marginBottom: 24
    },
    smolBtn:{
        paddingVertical: 8.0,
        paddingHorizontal: 12.0,
        marginTop: 14
    },
    smolBtnText:{
        fontWeight: '600',
        color: 'dodgerblue'
    }
})


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