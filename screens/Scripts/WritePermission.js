// Called when the user wants to download a file
import { PermissionsAndroid } from 'react-native'

const WritePermission = async () => {

    try {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
            {
                title: "Storage Permission Required",
                message : "App needs write access to your storage to download files"
            })
            if (granted == PermissionsAndroid.RESULTS.GRANTED) {
                console.log("Storage Write Permission Granted")
                return true
            }else{
                alert("Storage Write Permission Not granted")
                return false
            }
    } catch (error) {
        console.error(error)
    }
}

export default WritePermission