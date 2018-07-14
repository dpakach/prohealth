import {ChatUrls} from '../constants/urls';

// return configuration for api according to data and type of request
//
export const apiConfig = (type = 'get', data = null) => {
    return {
        method: type.toUpperCase(),
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Token ${localStorage.getItem('token')}`,
        },
        body: data ? JSON.stringify(data) : null,
    };
};

export const sendMessage = (id, form_data) => {
    return fetch(ChatUrls.MESSAGE(id), apiConfig('post', form_data))
        .then(response => response.json())
}

export const getMessage = (id) => {
    return fetch(ChatUrls.MESSAGE(id), apiConfig('get'))
        .then(response => {
            return response;
        })
}
