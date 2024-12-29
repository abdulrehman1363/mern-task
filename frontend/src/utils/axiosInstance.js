import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000/api',
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');

  // Exclude Authorization header for login and sign up requests
  const excludeAuthPaths = ['/auth/signup', '/auth/login'];
  const isExcluded = excludeAuthPaths.some((path) => config.url.includes(path));

  if (token && !isExcluded) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Add response interceptor (optional for error handling)
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    //Handle specific error codes globally, e.g., token expiration
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login'; // Redirect to login if unauthorized
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
