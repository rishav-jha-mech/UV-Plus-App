import { Alert } from 'react-native';
import { errorDownloading } from '../REDUX/actions';

export type raiseErrorParams = {
    id: string,
    filename: string,
    dispatch: Function
}

const raiseError = (params: raiseErrorParams) => {
    const { id, filename, dispatch } = params;

    dispatch(errorDownloading({
        id: id
    }));
    Alert.alert('Error occured while downloading' + filename);
}
export default raiseError