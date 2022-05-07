import downloadReducer from './Reducers/downloadReducer';
import { combineReducers } from 'redux';

export const allReducers = combineReducers({
    downloadReducer,
});