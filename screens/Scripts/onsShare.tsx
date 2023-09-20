import { Alert, Share } from "react-native";
import { AMAZON_STORE_URL } from "../constants";

const onShare = async () => {
    try {
        const result = await Share.share({
            title: 'App link',
            message: `Discover the ultimate video and music download experience with UV Downloader! \n\n🚀 Download your favorite videos and songs from various websites and enjoy them offline anytime, anywhere. It's fast, easy, and completely free.\n\nGet the app now and start downloading: ${AMAZON_STORE_URL} 📲 #UVDownloader #DownloadVideos #DownloadMusic #OfflineEntertainment`,
            url: 'https://github.com/Lannister-Labs/Speaker-Cleaner/blob/main/Coming%20Soon.md'
        });
        if (result.action === Share.sharedAction) {
            if (result.activityType) {
                // shared with activity type of result.activityType
            } else {
                // shared
            }
        } else if (result.action === Share.dismissedAction) {
            // dismissed
        }
    } catch (error:any) {
        Alert.alert(error.message);
    }
};

export default onShare