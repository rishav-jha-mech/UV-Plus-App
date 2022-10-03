import { createThumbnail, Thumbnail } from "react-native-create-thumbnail";
import { pError, pLog, pPrettyPrint } from "../constants";

export const CreateThumbnail = async (path: string): Promise<Thumbnail> => {
    path = `file:///${path}`
    try {
        const thumb = await createThumbnail({ url: path, timeStamp: 1000,format: 'png' });
        // pPrettyPrint(thumb);
        return thumb;
    } catch (e) {
        pError(e)
    }
}