import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    LOGOUT_FAIL
} from '../actions/types';

const initialState = {
    user_id: localStorage.getItem("user_id"),
    token: localStorage.getItem("token")
};

export default function(state = initialState, action) {
    const { type, payload } = action;

    //Actions and dispatchers
    switch(type) {
        case REGISTER_SUCCESS:
            //set user info
            return {
                ...state,
                user_id: payload.user_id,
                token: payload.token,
            }
        case LOGIN_SUCCESS:
            //set user info
            return {
                ...state,
                user_id: payload.user_id,
                token: payload.token
            }
        case LOGOUT_SUCCESS:
            //clean user info
            return {
                ...state,
                user_id: "",
                token: ""
            }
        case REGISTER_FAIL:
        case LOGIN_FAIL:
        case LOGOUT_FAIL:
        default:
            return state
    };
};
