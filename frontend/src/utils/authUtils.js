import {AuthUrls} from '../constants/urls';
export function getUserToken(state) {
    return state.auth.token;
}

export function getUserInfo(id) {
    return fetch(AuthUrls.USERS + id, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Token ${localStorage.getItem('token')}`,
        },
    })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                return Promise.reject(Error('cannot fetch the user'));
            }
        })
        .catch(e => {
            return Promise.reject(Error(e.message));
        });
}
