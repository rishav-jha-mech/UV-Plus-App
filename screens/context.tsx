import { createContext } from 'react';

interface ContextState {
    StartDownload: Function
}
export const AppContext = createContext({} as ContextState);