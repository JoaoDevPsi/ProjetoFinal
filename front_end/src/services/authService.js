import axios from 'axios';

const API_URL = import.meta.env.VITE_APP_API_URL;

const register = (username, email, password, password2) => {
    return axios.post(API_URL + 'auth/register/', {
        username,
        email,
        password,
        password2
    });
};

const login = (username, password) => {
    return axios.post(API_URL + 'auth/login/', {
        username,
        password
    })
    .then(response => {
        if (response.data.access) {
            return axios.get(API_URL + 'auth/me/', { headers: { Authorization: 'Bearer ' + response.data.access } })
                .then(userResponse => {
                    const userData = {
                        access: response.data.access,
                        refresh: response.data.refresh,
                        user: userResponse.data
                    };
                    localStorage.setItem('user', JSON.stringify(userData));
                    return userData;
                });
        }
        return response.data;
    });
};

const logout = () => {
    localStorage.removeItem('user');
};

const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem('user'));
};

const authService = {
    register,
    login,
    logout,
    getCurrentUser,
};

export default authService;