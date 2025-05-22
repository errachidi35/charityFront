// hooks/axiosAdmin.js
import axios from "axios";

const axiosAdmin = axios.create({
  baseURL: "http://localhost:8080/api",
});

// Intercepteur pour ajouter le token à chaque requête
axiosAdmin.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user?.token) {
    config.headers.Authorization = `Bearer ${user.token}`;
  }
  return config;
});

export default axiosAdmin;
