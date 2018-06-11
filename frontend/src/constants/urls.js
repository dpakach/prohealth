const ROOT_URL = 'http://localhost:8000/';

export const AuthUrls = {
    LOGIN: `${ROOT_URL}api/login/`,
    SIGNUP: `${ROOT_URL}api/users/`,
    LOGOUT: `${ROOT_URL}api/logout/`,
    UPDATE_PASSWORD: `${ROOT_URL}api/update-password/`
}

export const QueryUrls = {
    CREATE: `${ROOT_URL}api/query/`,
}
