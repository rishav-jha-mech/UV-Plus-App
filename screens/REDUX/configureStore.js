import { createStore } from 'redux';
import downloadReducer from './Reducers/downloadReducer';

export const store = createStore(downloadReducer);