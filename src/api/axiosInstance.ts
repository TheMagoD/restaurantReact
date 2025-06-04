import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080', 
});

axiosInstance.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
});


axiosInstance.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      console.warn('Token inválido o expirado. Redirigiendo al login.');
      localStorage.removeItem('token');
      localStorage.removeItem('role');
      window.location.href = '/'; 
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
