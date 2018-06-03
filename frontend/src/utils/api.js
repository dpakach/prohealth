import {AuthTypes} from '../constants/actionTypes';
import {AuthUrls} from '../constants/urls';
import history from './historyUtils';
import axios from 'axios';

export const login = (form_data) => {
    fetch(AuthUrls.LOGIN, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(form_data),
    }).then(response => {
        console.log(response);
        return response.json();
    }).then(data => {
        console.log(data);
        localStorage.setItem('authentication', data['key']);
    });
};


export const signup = form_data => {
    fetch(AuthUrls.SIGNUP, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(form_data),
    });
    //  fetch(AuthUrls.SIGNUP, {
    //      method: 'POST',
    //      headers: {
    //          'Content Type': 'application/json',
    //      },
    //      body: JSON.stringify(form_data),
    //  })
    //      .then(res => {
    //          console.log(res);
    //          return res.json();
    //      })
    //      .then(data => {
    //          console.log(data);
    //      });
};
