import Clipboard from '@react-native-community/clipboard'

const copyToClipboard = (text) => {
    console.info(text)
    Clipboard.setString(text);

}
export default copyToClipboard