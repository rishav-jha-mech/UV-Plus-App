import { PermissionsAndroid } from 'react-native'
import { pError, pLog } from '../constants';

const ReadPermission = async () => {

    try {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
            {
                title: "Storage Permission Required",
                message : "App needs write access to your storage to download files",
                buttonNeutral: "Ask Me Later",
                buttonNegative: "Cancel",
                buttonPositive: "OK"
            });
            if (granted == PermissionsAndroid.RESULTS.GRANTED) {
                // pLog("Storage Read Permission Granted")
                return true
            }else{
                // pError("Storage Permission not granted\n Now give the permission in the settings\n or the APP wont work")
                return false
            }
    } catch (error) {
        pError(error)
    }
}

export default ReadPermission