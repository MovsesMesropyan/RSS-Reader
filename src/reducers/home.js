import * as types from '../constants/actionTypes'

const INITIAL_STATE = {
    rssList: []
};

const HomeReducer = (state = INITIAL_STATE, action = {}) => {
    switch (action.type) {
        case types.GET_RSS_LIST:
            return Object.assign({}, state, {rssList: action.payload});
        default:
            return state;
    }
};

export default HomeReducer;
