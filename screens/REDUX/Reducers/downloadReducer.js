import RNFS from 'react-native-fs';
const initialState = [];

const downloadReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'START_DOWNLOADING':
            const { payload } = action;
            const params = {
                id: payload.id,
                url: payload.url,
                filename: payload.filename,
                fileSize: 0,
                downSize: 0,
            };
            return [...state, params];

        case 'DOWNLOADED_SUCCESSFULLY':
            // console.log('TRYNA SHOW DOWNLOADED_SUCCESSFULLY');
            // console.log(JSON.stringify(action));
            var downloadIndex = state.findIndex((obj => obj.id == payload.id));
            var updatedDownloads = [...state];
            updatedDownloads[downloadIndex].downSize = updatedDownloads[downloadIndex].fileSize;
            updatedDownloads[downloadIndex].completed = true;
            return [updatedDownloads];
        case 'SET_FILE_SIZE':
            // console.log('TRYNA SET FILE SIZE');
            // console.log(JSON.stringify(action));
            try {
                var downloadIndex = state.findIndex((obj => obj.id == payload.id));
                var updatedDownloads = [...state];
                updatedDownloads[downloadIndex].fileSize = payload.fileSize;
                return [updatedDownloads];
            } catch (error) {
                console.error(error);
                console.error('ERROR SETTING FILE SIZE')
            }
        case 'SET_DOWLOADED_FILE_SIZE':
            // console.log('TRYNA SET DOWNLOADED FILE SIZE');
            // console.log(JSON.stringify(action));
            try {
                var downloadIndex = state.findIndex((obj => obj.id == payload.id));
                var updatedDownloads = [...state];
                updatedDownloads[downloadIndex].downSize = payload.downSize
                return [updatedDownloads];
            } catch (error) {
                console.error(error);
                console.error('ERROR OCCURED WHILE SETTING DOWNSIZE');
            }
        default:
            return initialState;
    };
}

export default downloadReducer;