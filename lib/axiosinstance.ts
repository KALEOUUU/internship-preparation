import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: process.env.API_URL || "https://dummyjson.com",
  headers: {
    "Content-Type": "application/json",
  },
});
axiosInstance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      console.error("Unauthorized access - redirecting to login");
    }
    return Promise.reject(error);
  }
);