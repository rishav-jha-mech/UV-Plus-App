const initialState = [];

const downloadReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'START_DOWNLOADING':
            const { payload } = action
            const time = new Date();
            const id = time.toISOString();
            const params = {
                id: id,
                url: payload.url,
                filename: payload.filename,
                fileSize: 0,
                downSize: 0,
            };
            console.log(JSON.stringify(params,null,4));
            return [...state,params];
        default:
            return initialState;
    };
}

export default downloadReducer;