import axios from 'axios';

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api',
});

// Add token to every request (dynamically from Zustand store)
apiClient.interceptors.request.use((config) => {
  try {
    const persistState = JSON.parse(localStorage.getItem('auth-store'));
    const token = persistState?.state?.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  } catch (error) {
    console.error('Error reading token from localStorage', error);
  }
  return config;
}, (error) => Promise.reject(error));

// Handle response errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('auth-store');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default apiClient;
