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
  baseURL: process.env.REACT_APP_API_URL || 'https://todo-app-assessment-production.up.railway.app/api',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});
api.interceptors.request.use(config => {
  config.headers['X-Device-Token'] = getDeviceToken();
  return config;
});

export default api;

export async function saveTask(task) {
  const response = await api.post('/tasks', task);
  return response.data;
}