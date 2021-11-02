// Called when the user wants to download a file
import { PermissionsAndroid } from 'react-native'

const WritePermission = async () => {
    var result;
    try {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
            {
                title: "Storage Permission Required",
                message : "App needs write access to your storage to download files"
            })
            if (granted == PermissionsAndroid.RESULTS.GRANTED) {
                console.log("Storage Write Permission Granted")
                result = true
            }else{
                alert("Storage Write Permission Not granted")
                result = false
            }
    } catch (error) {
        console.error(error)
    }
    return result
}

export default WritePermission