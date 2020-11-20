import { combineReducers } from 'redux';
import {
    new_message,
} from './Types';

const initialState = {
    message: {},
};

const data = (state = initialState, action: any) => {
    switch (action.type) {
        case new_message:
            console.log("REDUX -- new message")
            return { ...state, message: action.payload.message };
        default:
            return state;
    }
};
const rootReducer = combineReducers({
    dataAll: data,
});

export default rootReducer;
