import {AuthTypes} from '../constants/actionTypes';

import {AuthUrls} from '../constants/urls';

import {message} from 'antd';

import store from '../store/configureStore';

import {getUserToken} from '../utils/authUtils';

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

export const receiveLogin = user => {
    return {
        type: AuthTypes.LOGIN_SUCCESS,
        isFetching: false,
        isAuthenticated: true,
        token: user.token,
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

// const logoutError = message => {
//     return {
//         type: AuthTypes.LOGOUT_FAILURE,
//         isFetching: false,
//         isAuthenticated: false,
//         message,
//     };
// };


const setUserProfile = (payload) => {
    return {
        type: AuthTypes.USER_PROFILE,
        payload: payload
    };
}

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
                    // console.log(response.json())
                    // If there was a problem, we want to
                    // dispatch the error condition
                    dispatch(
                        loginError(
                            'The email or password you entered is incorrect! Please make sure your email or password is valid',
                        ),
                    );
                    return Promise.reject(user);
                } else {
                    // If login was successful, set the token in local storage
                    localStorage.setItem('token', user.token);
                    localStorage.setItem('user', JSON.stringify(user));
                    localStorage.setItem('is_doctor', user.is_doctor);

                    // Dispatch the success action
                    dispatch(receiveLogin(user));
                    dispatch(setUserProfile(user))

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
        return fetch(AuthUrls.USERS, config)
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

export function getUserProfile() {
    const token = getUserToken(store.getState());
    let config = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Token ${token}`
        },
    };

    return (dispatch) => {
        if (token) {
            fetch(AuthUrls.USER_PROFILE, config)
                .then(response => {
                dispatch(setUserProfile(response.data))
            }).catch((error) => {
                // If request is bad...
                // Show an error to the user
                // console.log(error);
                // TODO: send notification and redirect
            });
        }
    };
}

export function updateUserProfile(creds, id) {
    let config = {
        method: 'PATCH',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(creds),
    };

    return dispatch => {
        // We dispatch requestLogin to kickoff the call to the API
        return fetch(`AuthUrls.USER_PROFILE${id}`, config)
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw Error(
                    'Some thing went wrong! Please make sure the information is valid',
                );
            })
            .then(data => {
                message.success('sucessfully updated profile');
            })
            .catch(err => console.log('Error: ', err));
    };
}

export function logoutUser(history) {
    return dispatch => {
        dispatch(requestLogout());
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        message.success('logged out succesfully');
        history.push('/user/login/');
        dispatch(receiveLogout());
    };
}


// // util functions
// function processServerError(error) {
//     return  Object.keys(error).reduce(function(newDict, key) {
//         if (key === "non_field_errors") {
//             newDict["_error"].push(error[key]);
//         } else if (key === "token") {
//             // token sent with request is invalid
//             newDict["_error"].push("The link is not valid any more.");
//         } else {
//             newDict[key] = error[key];
//         }
//         return newDict
//     }, {"_error": []});
// }
