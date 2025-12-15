import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://assistt.duckdns.org",
  // baseURL: "http://localhost:8080",
});

// Request interceptor
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor - NO REACT HOOKS HERE!
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const status = error.response?.status;

    // Handle 401 Unauthorized
    if (status === 401) {
      // Clear tokens
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      
      // For refresh token logic (optional)
      if (!originalRequest._retry) {
        originalRequest._retry = true;
        
        try {
          const refreshToken = localStorage.getItem("refreshToken");
          if (refreshToken) {
            // Try to refresh token
            const response = await axios.post(
              `${axiosInstance.defaults.baseURL}/api/v1/auth/refresh`,
              { refreshToken }
            );
            
            const newAccessToken = response.data.accessToken;
            localStorage.setItem("accessToken", newAccessToken);
            
            // Retry original request
            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
            return axiosInstance(originalRequest);
          }
        } catch (refreshError) {
          console.log("Token refresh failed:", refreshError);
        }
      }
      
      // Clear auth header for future requests
      delete axiosInstance.defaults.headers.common["Authorization"];
      
      // Throw a specific error that components can catch
      return Promise.reject({
        ...error,
        isAuthError: true,
        message: "Session expired. Please login again."
      });
    }
    
    return Promise.reject(error);
  }
);

export default axiosInstance;