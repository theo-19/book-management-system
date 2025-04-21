import axios from "axios";

const api = axios.create({ baseURL: "http://localhost:3001" });

// Attach token from localStorage on each request
api.interceptors.request.use((config) => {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
