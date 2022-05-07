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
                status: 0,
            };
            return [...state, params];
        case 'SET_FILE_SIZE':
            var downloadIndex = state.findIndex((obj => obj.id == action.id));
            var updatedDownloads = [...state];
            updatedDownloads[downloadIndex].fileSize = action.fileSize;
            return updatedDownloads;
        case 'SET_DOWLOADED_FILE_SIZE':
            var downloadIndex = state.findIndex((obj => obj.id == action.id));
            var updatedDownloads = [...state];
            updatedDownloads[downloadIndex].downSize = action.downSize
            return updatedDownloads;
        case 'DOWNLOADED_SUCCESSFULLY':
            var downloadIndex = state.findIndex((obj => obj.id == action.id));
            var updatedDownloads = [...state];
            updatedDownloads[downloadIndex].downSize = updatedDownloads[downloadIndex].fileSize;
            updatedDownloads[downloadIndex].status = 1;
            return updatedDownloads;
        case 'ERROR_DOWNLOADING':
            var downloadIndex = state.findIndex((obj => obj.id == action.id));
            var updatedDownloads = [...state];
            updatedDownloads[downloadIndex].status = -1;
            return updatedDownloads;
        default:
            return initialState;
    };
}

export default downloadReducer;

// Yeah bitch its workin'