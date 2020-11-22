import { combineReducers } from 'redux';
import {
    new_message,
    users_online
} from './Types';

const initialState = {
    message: {},
    users_online: []
};

const data = (state = initialState, action: any) => {
    switch (action.type) {
        case new_message:
            return { ...state, message: action.payload.message };
        case users_online:
            return { ...state, users_online: action.payload.users };
        default:
            return state;
    }
};
const rootReducer = combineReducers({
    dataAll: data,
});

export default rootReducer;
