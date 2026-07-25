import axios from "axios";
import Cookies from "js-cookie";

// Create custom Axios instance
const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || "http://localhost:8000/api",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

// Request Interceptor: Attach authentication token automatically if available
axiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor: Standardized error logging or formatting if needed
axiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // You can handle global HTTP status codes (e.g. 401 Unauthorized redirect) here
    return Promise.reject(error);
  }
);

export default axiosClient;
