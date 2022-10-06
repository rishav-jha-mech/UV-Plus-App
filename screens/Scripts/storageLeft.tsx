import RNFS from 'react-native-fs'
import { pError, pPrettyPrint } from '../constants'
import bytesConverter from './bytesConverter'

const StorageLeft = async (): Promise<string> => {
    try {
        let storage: RNFS.FSInfoResult = await RNFS.getFSInfo()
        return `${bytesConverter(storage.totalSpace - storage.freeSpace)} / ${bytesConverter(storage.totalSpace)}`
    } catch (error) {
        return ''
    }
}

export default StorageLeft