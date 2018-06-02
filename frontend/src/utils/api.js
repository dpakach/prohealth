import {AuthTypes} from '../constants/actionTypes';
import {AuthUrls} from '../constants/urls';
import history from './historyUtils';
import axios from 'axios';

export const login = ({token}) => {
    localStorage.setItem('token', token);
};

export const logout = () => {
    localStorage.removeItem('token');
    return {
        type: AuthTypes.LOGOUT,
    };
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
