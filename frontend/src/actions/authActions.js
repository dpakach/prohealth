import { AuthTypes  } from '../constants/actionTypes';

export const logoutAction = () => {
    return {
        type: AuthTypes.LOGOUT,
    };
};

export const loginAction = (token) => {
    return {
        type: AuthTypes.LOGOUT,
        token,
    };
};
