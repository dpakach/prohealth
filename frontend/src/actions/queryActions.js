import {QueryUrls} from '../constants/urls';


export const apiConfig = (type='get', data=null) => {
    return {
        method: type.toUpperCase(),
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Token ${localStorage.getItem('token')}`,
        },
        body: data ? JSON.stringify(data) : null,
    }
}


export const createQuery = form_data => {
    return fetch(QueryUrls.USER_QUERY, apiConfig('post', form_data))
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                Promise.reject(Error('Unable to Create Query'));
            }
        })
        .catch(e => {
            Promise.reject(Error('An error occured while creating the query'));
        });
};

export const getQueries = () => {
    return fetch(QueryUrls.USER_QUERY, apiConfig())
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                Promise.reject(Error('Unable to Create Query'));
            }
        })
        .catch(e => {
            Promise.reject(
                Error('An error occured while fetching the queries'),
            );
        });
};

export const getQueryItem = id => {
    return fetch(QueryUrls.USER_QUERY + id, apiConfig())
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                Promise.reject(Error('unable to fetch query'));
            }
        })
        .catch(e => {
            Promise.reject(Error('failed to load resource'));
        });
};

export const setAppointment = (form_data) => {
    console.log(form_data)
    return fetch(QueryUrls.APPOINTMENT, apiConfig('post', form_data))
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                Promise.reject(Error('unable to set Appointment'));
            }
        })
        .catch(e => {
            Promise.reject(Error('failed to post resources'));
        });
};

export const pescribe = (form_data) => {
    console.log(form_data)
    return fetch(QueryUrls.PESCRIPTION, apiConfig('post', form_data))
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                Promise.reject(Error('unable to post data'));
            }
        })
        .catch(e => {
            Promise.reject(Error('failed to post resources'));
        });
};

export const getAppointment = () => {
    return fetch(QueryUrls.APPOINTMENT, apiConfig())
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                Promise.reject(Error('unable to post data'));
            }
        })
        .catch(e => {
            Promise.reject(Error('failed to post resources'));
        });
}
