import {AuthTypes} from '../constants/actionTypes';

import {AuthUrls} from '../constants/urls';

import {CALL_API} from '../utils/api';

import history from '../utils/historyUtils';

import {message} from 'antd';

// states for login action
//
//
const requestLogin = creds => {
    return {
        type: AuthTypes.LOGIN_REQUEST,
        isFetching: true,
        isAuthenticated: false,
        creds,
    };
};

const receiveLogin = user => {
    return {
        type: AuthTypes.LOGIN_SUCCESS,
        isFetching: false,
        isAuthenticated: true,
        id_token: user.id_token,
    };
};

const loginError = message => {
    return {
        type: AuthTypes.LOGIN_FAILURE,
        isFetching: false,
        isAuthenticated: false,
        message,
    };
};

//states for logout action
//
//
const requestLogout = creds => {
    return {
        type: AuthTypes.LOGOUT_REQUEST,
        isFetching: true,
        isAuthenticated: true,
    };
};

const receiveLogout = user => {
    return {
        type: AuthTypes.LOGOUT_SUCCESS,
        isFetching: false,
        isAuthenticated: false,
    };
};

const logoutError = message => {
    return {
        type: AuthTypes.LOGOUT_FAILURE,
        isFetching: false,
        isAuthenticated: false,
        message,
    };
};

// calls the API to get a token and dispatch the action
//
export function loginUser(creds, history) {
    let config = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(creds),
    };

    return dispatch => {
        // We dispatch requestLogin to kickoff the call to the API
        dispatch(requestLogin(creds));
        return fetch(AuthUrls.LOGIN, config)
            .then(response => response.json().then(user => ({user, response})))
            .then(({user, response}) => {
                if (!response.ok) {
                    // If there was a problem, we want to
                    // dispatch the error condition
                    dispatch(loginError('The email or password you entered is incorrect! Please make sure your email or password is valid'));
                    return Promise.reject(user);
                } else {
                    // If login was successful, set the token in local storage
                    localStorage.setItem('token', user.token);
                    localStorage.setItem('user', JSON.stringify(user));

                    // Dispatch the success action
                    dispatch(receiveLogin(user));

                    history.push('/');
                }
            })
            .catch(err => console.log('Error: ', err));
    };
}

export function signupUser(creds, history) {
    let config = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(creds),
    };

    return dispatch => {
        // We dispatch requestLogin to kickoff the call to the API
        return fetch(AuthUrls.SIGNUP, config)
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw Error(
                    'Some thing went wrong! Please make sure the information is valid',
                );
            })
            .then(data => {
                message.success('signed up succesfully');
                history.push('/user/login/');
            })
            .catch(err => console.log('Error: ', err));
    };
}


export function logoutUser() {
    return dispatch => {
        dispatch(requestLogout());
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        dispatch(receiveLogout());
    };
}
