import RNFS from 'react-native-fs'
import { pError, pLog } from '../constants';

const deleteFile = async (path: string) => {
    let exists = await RNFS.exists(path);
    if (exists) {
        try {
            await RNFS.unlink(path);
            pLog(`File at "${path}" deleted successfully`);
        } catch (err) {
            pError(err);
        }
    } else {
        pError(`File at "${path}" does not exist`);
    }
}

export default deleteFile
