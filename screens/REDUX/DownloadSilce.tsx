import { createSlice } from '@reduxjs/toolkit';
import { DownloadingParams } from '../types';


export const initialState: Array<DownloadingParams> = [];

const Download = createSlice({
    name: 'download',
    initialState,
    reducers: {
        startDownloading: (state, action: { payload: { id: string, url: string, filename: string } }) => {
            const params = {
                id: action.payload.id,
                url: action.payload.url,
                filename: action.payload.filename,
                fileSize: 0,
                downSize: 0,
                status: 0,
            };
            state.push(params);
        },
        setFilesize: (state, action: { payload: { id: string, fileSize: number } }) => {
            var downloadIndex = state.findIndex((obj => obj.id == action.payload.id));
            state[downloadIndex].fileSize = action.payload.fileSize;
        },
        setDownloadedFileSize: (state, action: { payload: { id: string, downSize: number } }) => {
            var downloadIndex = state.findIndex((obj => obj.id == action.payload.id));
            state[downloadIndex].downSize = action.payload.downSize
        },
        downloadedSuccessfully: (state, action: { payload: { id: string } }) => {
            var downloadIndex = state.findIndex((obj => obj.id == action.payload.id));
            state[downloadIndex].downSize = state[downloadIndex].fileSize;
            state[downloadIndex].status = 1;
        },
        errorDownloading: (state, action: { payload: { id: string } }) => {
            var downloadIndex = state.findIndex((obj => obj.id == action.payload.id));
            state[downloadIndex].status = -1;
        },

    },
});

export const { downloadedSuccessfully, errorDownloading, setDownloadedFileSize, setFilesize, startDownloading } = Download.actions;
export default Download.reducer;