import axios from "axios";

const axiosPrivate = axios.create({
  baseURL: "http://localhost:8080/api", // adapte l’URL selon ton backend
  headers: {
    "Content-Type": "application/json",
  },
});

// Ajouter automatiquement le token JWT dans chaque requête
axiosPrivate.interceptors.request.use(
  (config) => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user?.token) {
      config.headers.Authorization = `Bearer ${user.token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosPrivate;
