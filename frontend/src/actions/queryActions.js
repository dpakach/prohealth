import {QueryUrls} from '../constants/urls';

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

// API request for creating new query
//
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

// API request for fetching all querys
//
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

// API request for fetching one query item
//
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

// API request for deleting one query item
//
export const deleteQueryItem = id => {
    return fetch(QueryUrls.USER_QUERY + id, apiConfig('delete'))
        .then(response => {
            if (response.ok) {
                return;
            } else {
                Promise.reject(Error('unable to delete query'));
            }
        })
        .catch(e => {
            console.log(e);
            Promise.reject(
                Error('An error occured while performing the action'),
            );
        });
};

// Api request for creating new appointment item for a query
//
export const setAppointment = (form_data, id) => {
    console.log(form_data);
    return fetch(QueryUrls.APPOINTMENT(id), apiConfig('post', form_data))
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

// API request for creating pescription for a query item
//
export const pescribe = (form_data, id) => {
    console.log(form_data);
    return fetch(QueryUrls.PESCRIPTION(id), apiConfig('post', form_data))
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

// API request for fetching appointment of a query
//
export const getAppointment = id => {
    return fetch(QueryUrls.APPOINTMENT(id), apiConfig())
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                Promise.reject(Error('unable to load resources'));
            }
        })
        .catch(e => {
            Promise.reject(Error('unable to load resources'));
        });
};

// API request for fetching prescription of a query
//

export const getPescription = id => {
    return fetch(QueryUrls.PESCRIPTION(id), apiConfig())
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                Promise.reject(Error('unable to load resources'));
            }
        })
        .catch(e => {
            Promise.reject(Error('unable to load resources'));
        });
};
