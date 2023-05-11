import RNFS from 'react-native-fs';
import { Alert } from 'react-native';
import { pError, pLog, pPrettyPrint } from '../constants';

const RenameFile = (newfilename: string, path: string, setLoading: Function, showRenameModal: Function): void => {

    if (newfilename === '') {
        Alert.alert('Error', 'File name cannot be empty !')
        return;
    }
    if (newfilename.includes("\"") || newfilename.includes('/') || newfilename.includes(':') || newfilename.includes('*') || newfilename.includes('?') || newfilename.includes('"') || newfilename.includes('<') || newfilename.includes('>') || newfilename.includes('|')) {
        Alert.alert('Error', 'File name cannot contain special characters !')
        return;
    }

    // Check if the file name isnt changed
    if (newfilename === path.slice(path.lastIndexOf('/') + 1, path.length)) {
        showRenameModal(false);
        return;
    }

    // Check if the format is changed
    let oldExtension = getExtension(path)
    let newExtension = getExtension(newfilename)
    if (oldExtension !== newExtension && oldExtension !== '') {
        // Alert.alert('Warning', 'If you change the file format then the file may not function properly !');
        Alert.alert('Warning', 'Are you sure you want to change the file format ?\nIf you change the file format then the file may not function properly !', [
            {
                text: 'Cancel',
                style: 'cancel',
                onPress: () => {
                    showRenameModal(false);
                    return;
                }
            },
            {
                text: 'OK',
                onPress: () => {
                    RawRenameFile(newfilename, path, setLoading, showRenameModal);
                }
            }
        ])
    } else {
        RawRenameFile(newfilename, path, setLoading, showRenameModal);
    }
}

const getExtension = (path: string): string => {
    if (path.includes('.') == false) {
        return ''
    }
    return path.slice(path.lastIndexOf('.') + 1, path.length);
}

const convertToFile = (path: string) => {
    return `file:///${path}`;
}

const RawRenameFile = (newfilename: string, path: string, setLoading: Function, showRenameModal: Function): void => {
    const newPath = path.slice(0, path.lastIndexOf('/') + 1) + newfilename;
    RNFS.moveFile(convertToFile(path), convertToFile(newPath))
        .then(() => {
            Alert.alert('Success', 'File Renamed Successfully !');
            setLoading();
            showRenameModal(false);
        })
        .catch((err) => {
            pError(err)
            setLoading();
            showRenameModal(false);
            Alert.alert('Error', 'The file you are trying to rename is not accessible !');
        })
}

export default RenameFile