import axios from 'axios';
import { clearSession } from './actions';




/**
 * Axios instance configured for your backend API.
 */
const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});



/**
 * Request Interceptor: Attach Authorization header if token exists.
 */
axiosInstance.interceptors.request.use((config) => {
  const token = sessionStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;


/**
 * Response Interceptor: Handle global response errors.
 */
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('Response error:', error);
    console.log(error.config?.url)
    if (error.response?.status === 401) {
      let redirect_page = false
      if (error.config?.url !== '/api/token/') {
        redirect_page = true;

      }
      clearSession(redirect_page);
    }

    return Promise.reject(error);
  }
);