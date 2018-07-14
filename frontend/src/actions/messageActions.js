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


export const getMessages = () => {
    return fetch(ChatUrls.RECEIVED, apiConfig())
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                Promise.reject(Error('Unable to load notifications'));
            }
        })
        .catch(e => {
            Promise.reject(e.message);
        });
};

export const readAllMessages = () => {
    return fetch(ChatUrls.READ_ALL, apiConfig())
        .then(response => {
            console.log(response)
            if (response.ok) {
                return;
            } else {
                Promise.reject(Error('cannot read notifications'));
            }
        })
        .catch(e => {
            Promise.reject(e.message);
        });
}

export const readMessageByQuery = (id) => {
    fetch(ChatUrls.READ_BY_QUERY(id), apiConfig())
        .then(response =>{
            if (response.ok) {
                return;
            } else {
                Promise.reject(Error('cannot read notifications'));
            }
        })
        .catch(e => {
            Promise.reject(e.message);
        });
}
