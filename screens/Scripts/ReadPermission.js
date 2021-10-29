//  Called when the file is getting downloaded along with WritePermission
// Called alone when user want sto check the Downloads folder

import { PermissionsAndroid, Alert } from 'react-native'

const ReadPermission = async () => {

    try {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
            {
                title: "Storage Permission Required",
                message : "App needs write access to your storage to download files",
            });
            if (granted == PermissionsAndroid.RESULTS.GRANTED) {
                console.log("Storage Read Permission Granted")
                // return true
            }else{
                console.log("Storage Permission not granted\n Now give the permission in the settings\n or the APP wont work")
                // return false
            }
    } catch (error) {
        console.error(error)
    }
}

export default ReadPermission