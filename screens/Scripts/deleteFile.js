import RNFetchBlob from 'rn-fetch-blob';
import WritePermission from './WritePermission'
import fileExists from './fileExists';

// Thanks To React Native & Facebook This Does Not Work
// The Main Task Of an App is to solve the problem
// It does not matter if its a bit slow or less performant
// But the problem should be solved here i can't even rename Files
// Even after having full read write permission from the user

// React Native is indeed Garbage! its time to switch to JAVA 🙂

const deleteFile = (path) => {

    WritePermission()
    if(fileExists(path)){
        RNFetchBlob.fs.unlink(path)
        .then(() => {
            console.log('FILE DELETED at => ',path);
        })
        .catch((err) => {
            console.log(err.message);
        });
    }else{
        console.log("File DOES NOT EXISTS")
    }
    
}

export default deleteFile