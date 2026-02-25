import axios from 'axios';
const getDeviceToken = () => {
    let token = localStorage.getItem('device_token');
    if (!token) {
        token = 'dt_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now();
        localStorage.setItem('device_token', token);
    }
    return token;
};

const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL || 'http://127.0.0.1:8000/api',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-Device-Token': getDeviceToken(),
    }
});

export default api;