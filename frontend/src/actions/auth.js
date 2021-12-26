import axios from 'axios';
import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    LOGOUT_FAIL
} from './types';

//login function
export const login = (username, password) => async dispatch => {
    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({ username, password });

    try {
        const res = await axios.post(`/api/user/login`, body, config);

        //check response
        if (res.data.message === "Success") {
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("user_id", res.data.user_id);
            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data
            });
        } else {
            dispatch({
                type: LOGIN_FAIL
            });
        }
    } catch(err) {
        dispatch({
            type: LOGIN_FAIL
        });
    }
};

//Register function
export const register = (username, password, email) => async dispatch => {
    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({ username, password, email });

    try {
        const res = await axios.post(`/api/user/register`, body, config);

        //Check response
        if (res.data.message === "Success") {
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("user_id", res.data.user_id);
            dispatch({
                type: REGISTER_SUCCESS,
                payload: res.data
            });
        } else {
            dispatch({
                type: REGISTER_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: REGISTER_FAIL
        });
    }
};

export const logout = () => async dispatch => {
    try {
        localStorage.setItem("token", "");
        localStorage.setItem("user_id", "");
        dispatch({
            type: LOGOUT_SUCCESS
        });
    } catch(err) {
        dispatch({
            type: LOGOUT_FAIL
        });
    }
};
