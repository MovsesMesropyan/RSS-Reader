import * as types from '../constants/actionTypes';
import rssReaderAppAPI from '../services/api';

export const getRssList = () => {
    return (dispatch) => {
        dispatch({type: types.DATA_IS_LOADING, payload: true});
                rssReaderAppAPI.getRssList().then((response) => {
            dispatch({type: types.DATA_IS_LOADING, payload: false});
            if (response.status === 200 && response.data && response.data.items && Array.isArray(response.data.items)) {
                dispatch({type: types.GET_RSS_LIST, payload: response.data.items})
            } else {
                dispatch({type: types.ALERT, payload: {showAlert: true, type: 'danger', title: 'Oh snap! You got an error!', body: 'Something went wrong. Please try again'}});
            }
        }, (error) => {
            dispatch({type: types.ALERT, payload: {showAlert: true, type: 'danger', title: 'Oh snap! You got an error!', body: 'Something went wrong. Please try again'}});
        });
    }
};