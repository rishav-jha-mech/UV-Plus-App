import { configureStore } from "@reduxjs/toolkit";
import Download from "./DownloadSilce";

export const Store = configureStore({
    reducer: {
        downloadList: Download,
    },
});

export type AppDispatch = typeof Store.dispatch;
export type RootState = ReturnType<typeof Store.getState>;