import { AuthTypes  } from '../constants/actionTypes';

export const logoutAction = () => {
    localStorage.removeItem('token');
    localStorage.setItem('authenticated', false);
    return {
        type: AuthTypes.LOGOUT,
    };
};

export const loginAction = (token) => {
    localStorage.setItem('token', token);
    localStorage.setItem('authenticated', true);
    return {
        type: AuthTypes.LOGIN,
        token,
    };
}
