// lib/axios/axiosInstance.ts
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    // Kalau nanti pakai token dari cookie atau localStorage:
    // const token = getCookie('token');
    // if (token) config.headers.Authorization = ⁠ Bearer ${token} ⁠;
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor untuk response
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.warn("Unauthorized - redirect atau hapus token");
      // Contoh: deleteCookie('token');
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;