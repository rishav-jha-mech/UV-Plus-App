import Clipboard from '@react-native-community/clipboard'
import { pLog } from '../constants';

const copyToClipboard = (text: string) => {
    pLog(text);
    Clipboard.setString(text);

}
export default copyToClipboard