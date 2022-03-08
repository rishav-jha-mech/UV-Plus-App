import FileViewer from "react-native-file-viewer";

const OpenFile = (path) => {
    console.log(path);
    FileViewer.open(path, { showOpenWithDialog: false, displayName: true })
        .then(() => {
            // console.log('Do nothing');
        })
        .catch((error) => {
            alert('You dont have any app to open files of this type');
        });
}

export default OpenFile;