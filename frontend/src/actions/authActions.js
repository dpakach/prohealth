import {AuthTypes} from '../constants/actionTypes';

export const login = ({token}) => {
    localStorage.setItem('token', token);
    return {
        type: AuthTypes.LOGIN,
        token,
    };
};

export const logout = () => {
    localStorage.removeItem('token');
    return {
        type: AuthTypes.LOGOUT,
    };
};
