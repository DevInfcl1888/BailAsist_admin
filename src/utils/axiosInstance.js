import axios from "axios";
const axiosInstace = axios.create({
  baseURL: "https://assistt.duckdns.org",
  // baseURL: "http://localhost:8080",
});

axiosInstace.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) config.headers["Authorization"] = `Bearer ${token}`;
  return config
});

export default axiosInstace;
