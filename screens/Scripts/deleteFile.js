import RNFS from 'react-native-fs';

const deleteFile = (path) => {

    RNFS.unlink(path).
    then(() =>{
        console.log('File Deleted Successfully');
    }).catch(err =>{
        console.log(err);
    })
    
}

export default deleteFile