import axios from "axios";

const backend_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:8080/api";

const axiosInstance = axios.create({
  baseURL: backend_URL,
  timeout: 600000, // INCREASED: 10 minutes for large video uploads
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
  // ADDED: Support for upload progress
  maxContentLength: Infinity,
  maxBodyLength: Infinity,
});

// Add token to requests
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // Log upload requests
    if (config.url?.includes('/upload')) {
      console.log('🚀 Upload request starting:', {
        url: config.url,
        method: config.method,
        hasData: !!config.data,
      });
    }
    
    return config;
  },
  (error) => {
    console.error('Request interceptor error:', error);
    return Promise.reject(error);
  }
);

// Handle responses
axiosInstance.interceptors.response.use(
  (response) => {
    // Log upload completions
    if (response.config.url?.includes('/upload')) {
      console.log('✅ Upload response received:', {
        status: response.status,
        data: response.data
      });
    }
    return response;
  },
  (error) => {
    console.error('Response error:', {
      status: error.response?.status,
      message: error.message,
      url: error.config?.url
    });
    
    if (error.response?.status === 401) {
      localStorage.removeItem("authToken");
      const currentPath = window.location.pathname;
      if (currentPath !== "/login" && currentPath !== "/register") {
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
export { backend_URL };