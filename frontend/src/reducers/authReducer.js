import { AuthTypes } from '../constants/actionTypes';

const authReducerDefaultState = {
    authenticated: false,
    token: null,
    user: {}
}

const authReducer = (state=authReducerDefaultState, action) => {
    switch(action.type) {
        case AuthTypes.LOGIN:
            return {...state, authenticated: true, token: action.token};

        case AuthTypes.LOGOUT:
            return {...state, authenticated: false, token: null, user: null};

        case AuthTypes.USER_PROFILE:
            return {...state, user: action.user};

        default:
            return state
    }
}

export default authReducer;
