import {AuthTypes} from '../constants/actionTypes';
import {AuthUrls} from '../constants/urls';
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
    axios.post(AuthUrls.SIGNUP, form_data)
        .then(res => {
            console.log(res);
            console.log(res.data);
        });
}
