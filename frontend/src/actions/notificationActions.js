import {NotificationUrls} from '../constants/urls';

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


export const getNotifications = () => {
    return fetch(NotificationUrls.NOTIFICATIONS, apiConfig())
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

export const readAllNotifications = () => {
    console.log(NotificationUrls)
    return fetch(NotificationUrls.READ_ALL_NOTIFICATIONS, apiConfig())
        .then(response => {
            console.log(response)
            if (response.ok) {
                return;
            } else {
                Promise.reject(Error('cannot read notifications'));
            }
        })
        .catch(e => {
            Promise.reject(
                Error('An error occured while fetching the queries'),
            );
        });
}

export const readNotificationsByQuery = (id) => {
    fetch(NotificationUrls.READ_BY_QUERY(id), apiConfig())
        .then(response =>{
            if (response.ok) {
                return;
            } else {
                Promise.reject(Error('cannot read notifications'));
            }
        })
        .catch(e => {
            Promise.reject(
                Error('An error occured while fetching the queries'),
            );
        });
}
