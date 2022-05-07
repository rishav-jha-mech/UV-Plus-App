const initialState = [];

const downloadReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'START_DOWNLOAD':
            const { payload } = action.payload
            const time = new Date();
            const id = time.toISOString();
            const params = {
                id: id,
                url: payload.url,
                filename: payload.filename,
                fileSize: 0,
                downSize: 0,
            };
            return [...state, action.payload];
        default:
            return initialState;
    };
}

export default downloadReducer;