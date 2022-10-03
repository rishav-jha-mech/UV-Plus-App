import { Share, Alert } from 'react-native'

const toShare = async (url: string) => {
    try {
        const result = await Share.share({
            message: url,
        });
    } catch (error: any) {
        Alert.alert(error.message);
    }
}
export default toShare