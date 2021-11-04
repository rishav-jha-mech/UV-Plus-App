import { Share } from 'react-native'

const toShare = async (url) => {
    try {
        const result = await Share.share({
            message: url,
        });
    } catch (error) {
        alert(error.message);
    }
}
export default toShare