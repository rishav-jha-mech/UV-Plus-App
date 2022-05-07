export const startDownloading = (payload) =>{
    return{
        type: 'START_DOWNLOADING',
        payload: payload
    };
}