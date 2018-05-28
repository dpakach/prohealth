import AuthTypes from '../constants/actionTypes';

export const login = ({token}) => ({
    type: AuthTypes.LOGIN,
    token,
});

export const logout = ({token}) => {
    localStorage.removeItem("token");
    return {
        type: AuthTypes.LOGOUT,
    };
};


