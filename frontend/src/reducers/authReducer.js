import {AuthTypes} from '../constants/actionTypes';

import {AuthUrls} from '../constants/urls';

import {CALL_API} from '../utils/api';

const authReducer = (
    state = {
        isFetching: false,
        isAuthenticated: localStorage.getItem('token') ? true : false,
        token: localStorage.getItem('token'),
        user: {}
    },
    action,
) => {
    switch (action.type) {
        case AuthTypes.SIGNUP_SUCCESS:
            return {...state, signup: true, errorMessage: {}};

        case AuthTypes.SIGNUP_FAILURE:
            return {
                ...state,
                signup: false,
                errorMessage: {signup: action.message},
            };

        case AuthTypes.SIGNUP_RESEND_FAILURE:
            return {
                ...state,
                signup: true,
                errorMessage: {signupResend: action.message},
            };

        case AuthTypes.LOGIN_REQUEST:
            return Object.assign({}, state, {
                isFetching: true,
                isAuthenticated: false,
                user: action.creds,
            });

        case AuthTypes.LOGIN_SUCCESS:
            return Object.assign({}, state, {
                isFetching: false,
                isAuthenticated: true,
                token: action.token,
                errorMessage: {},
            });

        case AuthTypes.LOGIN_FAILURE:
            return Object.assign({}, state, {
                isFetching: false,
                isAuthenticated: false,
                errorMessage: {login: action.message},
            });
        case AuthTypes.LOGOUT_SUCCESS:
            return Object.assign({}, state, {
                isFetching: true,
                isAuthenticated: false,
            });

        case AuthTypes.USER_PROFILE:
            return Object.assign({}, state, {
                user: action.payload,
            });

        default:
            return state;
    }
};

export default authReducer;
