import { createSlice } from '@reduxjs/toolkit';
import { DownloadingParams } from '../types';


export const initialState: Array<DownloadingParams> = [];

const Download = createSlice({
    name: 'download',
    initialState,
    reducers: {
        startDownloading: (state, action: { payload: { id: string, url: string, filename: string } }) => {
            const params: DownloadingParams = {
                id: action.payload.id,
                url: action.payload.url,
                filename: action.payload.filename,
                fileSize: 0,
                downSize: 0,
                status: 'Downloading',
            };
            state.push(params);
        },
        startDownloadingVideo: (state, action: { payload: { id: string, url: string, filename: string } }) => {
            const params: DownloadingParams = {
                id: action.payload.id,
                url: action.payload.url,
                filename: action.payload.filename,
                fileSize: 0,
                downSize: 0,
                status: 'Dowloading Video',
            };
            state.push(params);
        },
        startDownloadingAudio: (state, action: { payload: { id: string } }) => {
            var downloadIndex = state.findIndex((obj => obj.id == action.payload.id));
            state[downloadIndex] = {
                ...state[downloadIndex],
                fileSize: 0,
                downSize: 0,
                status: 'Downloading Audio',
            };
        },
        startMergingAudioVideo: (state, action: { payload: { id: string } }) => {
            var downloadIndex = state.findIndex((obj => obj.id == action.payload.id));
            state[downloadIndex] = {
                ...state[downloadIndex],
                fileSize: 0,
                downSize: 100, // This will be shown as the percentage of merging compelted
                status: 'Mergin Audio and Video',
            };
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
            state[downloadIndex].status = 'Downloaded';
        },
        errorDownloading: (state, action: { payload: { id: string } }) => {
            var downloadIndex = state.findIndex((obj => obj.id == action.payload.id));
            state[downloadIndex].status = 'Error';
        },
        removeDownloading: (state, action: { payload: { id: string } }) => {
            var downloadIndex = state.findIndex((obj => obj.id == action.payload.id));
            state.splice(downloadIndex, 1);
        },
        videoDownloading: (state, action: { payload: { id: string } }) => {
            var downloadIndex = state.findIndex((obj => obj.id == action.payload.id));
            state[downloadIndex].status = 'Dowloading Video';
        }
    },
});

export const {
    downloadedSuccessfully,
    errorDownloading,
    setDownloadedFileSize,
    setFilesize,
    startDownloading,
    removeDownloading,
    videoDownloading,
    startDownloadingVideo,
    startDownloadingAudio,
    startMergingAudioVideo,
} = Download.actions;
export default Download.reducer;