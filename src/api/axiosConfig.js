import axios from "axios";

const api = axios.create({
  baseURL: "https://java-test-lab.onrender.com"
});

api.interceptors.request.use((config) => {

  const token =
    sessionStorage.getItem("token") || localStorage.getItem("token");

  // ❌ Do NOT attach token for auth APIs
  if (
    token &&
    !config.url.includes("/auth/login") &&
    !config.url.includes("/auth/register")
  ) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;