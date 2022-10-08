import RNFS from 'react-native-fs';
import { pError } from '../constants';


const FileExists = async (path: string): Promise<boolean> => {
    try {
        const res = await RNFS.exists(path);
        return res;
    } catch (error) {
        pError(error)
        return false;
    }
}

export default FileExists