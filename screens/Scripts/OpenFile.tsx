import { Alert } from 'react-native';
import FileViewer from "react-native-file-viewer";
import { pError, pLog } from "../constants";

const OpenFile = (path: string, name: string): void => {
    // pLog(path);
    FileViewer.open(path, { showOpenWithDialog: false, displayName: name, showAppsSuggestions: true })
        .then(() => {
            // console.log('Do nothing');
        })
        .catch((error) => {
            pError(error);
            Alert.alert('You dont have any app to open files of this type');
        });
}

export default OpenFile;