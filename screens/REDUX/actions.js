export const startDownloading = (payload) => {
    return {
        type: 'START_DOWNLOADING',
        payload: payload
    };
}
export const setFilesize = (payload) => {
    return {
        type: 'SET_FILE_SIZE',
        id: payload.id,
        fileSize: payload.fileSize
    };
};
export const setDownloadedFileSize = (payload) => {
    return {
        type: 'SET_DOWLOADED_FILE_SIZE',
        id: payload.id,
        downSize: payload.downSize
    }
};
export const downloadedSuccessfully = (payload) => {
    return {
        type: 'DOWNLOADED_SUCCESSFULLY',
        id: payload.id,
        downSize: payload.fileSize
    };
};
export const errorDownloading = (payload) => {
    return {
        type: 'ERROR_DOWNLOADING',
        id: payload.id
    };
};