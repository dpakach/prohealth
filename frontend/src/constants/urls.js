export const ROOT_URL = 'http://localhost:8000';

export const AuthUrls = {
    LOGIN: `${ROOT_URL}/api/login/`,
    USERS: `${ROOT_URL}/api/users/`,
    LOGOUT: `${ROOT_URL}/api/logout/`,
    UPDATE_PASSWORD: `${ROOT_URL}/api/update-password/`,
    USER_PROFILE: `${ROOT_URL}/api/user-profiles/`,
    DOCTOR_PROFILE: `${ROOT_URL}/api/doctor-profiles/`,
}

export const QueryUrls = {
    USER_QUERY: `${ROOT_URL}/api/query/`,
    APPOINTMENT: (id) => `${ROOT_URL}/api/query/${id}/appoint`,
    PESCRIPTION: (id) => `${ROOT_URL}/api/query/${id}/prescribe`,
    MEDICINE: (id, med_id) => `${ROOT_URL}/api/query/${id}/prescribe/${med_id}`,
    FILES: (id) => `${ROOT_URL}/api/query/${id}/files`,
    RESOLVE: (id) => `${ROOT_URL}/api/query/${id}/resolve`,
    TAKE: (id) => `${ROOT_URL}/api/query/${id}/take`,
}

export const NotificationUrls = {
    NOTIFICATIONS: `${ROOT_URL}/api/notifications/`,
    READ_ALL_NOTIFICATIONS: `${ROOT_URL}/api/notifications/read_all/`,
    READ_BY_QUERY: (id) =>  `${ROOT_URL}/api/notifications/read_all/${id}`,
}

