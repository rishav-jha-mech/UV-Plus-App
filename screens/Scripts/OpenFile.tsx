import { Alert } from 'react-native';
import FileViewer from "react-native-file-viewer";
import { pError, pLog } from "../constants";
import RNFS from 'react-native-fs';

const OpenFile = (path: string, name: string): void => {
    // pLog(path);
    RNFS.exists(path).then((exists) => {
        if (exists) {
            FileViewer.open(path, { showOpenWithDialog: false, displayName: name, showAppsSuggestions: true })
                .then(() => {
                    // console.log('Do nothing');
                })
                .catch((error) => {
                    pError(error);
                    Alert.alert('You dont have any app to open files of this type');
                });
        } else {
            Alert.alert('File does not exist');
        }
    }).catch((err) => {
        pError(err);
        Alert.alert('Something went wrong');
    });
}

export default OpenFile;