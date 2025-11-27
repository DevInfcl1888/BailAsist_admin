import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
const axiosInstace = axios.create({
  baseURL: "https://assistt.duckdns.org",
  // baseURL: "http://localhost:8080",
});

axiosInstace.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) config.headers["Authorization"] = `Bearer ${token}`;
  return config;
});

// after axios.create(...)
axiosInstace.interceptors.response.use(
  (response) => response,
  (error) => {
    const navigate = useNavigate();
    const location = useLocation();
    const status = error.response?.status;

    // only act when 401 and user is not already on login page
    if (status === 401 && location.pathname !== "/") {
      // remove token + auth header
      localStorage.removeItem("accessToken");
      delete axiosInstace.defaults.headers.common["Authorization"];

      // optional: show a message (non-blocking)
      // Swal.fire("Session expired", "Please login again.", "warning");

      // redirect to login (full reload to reset app state)
      navigate("/");
    }

    return Promise.reject(error);
  }
);

export default axiosInstace;
