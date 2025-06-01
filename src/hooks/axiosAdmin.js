// hooks/axiosAdmin.js
import axios from "axios";

// Fonction pour récupérer et valider le token
const getValidToken = () => {
  try {
    const userStr = localStorage.getItem("user");
    if (!userStr) {
      console.error("No user data in localStorage");
      return null;
    }

    const user = JSON.parse(userStr);
    if (!user || !user.token) {
      console.error("No token in user data");
      return null;
    }

    // S'assurer que le token est une chaîne et commence par "Bearer "
    const token = user.token.toString();
    return token.startsWith("Bearer ") ? token : `Bearer ${token}`;
  } catch (error) {
    console.error("Error getting token:", error);
    return null;
  }
};

const axiosAdmin = axios.create({
  baseURL: "http://localhost:8080/api",
  headers: {
    'Content-Type': 'application/json'
  }
});

// Intercepteur pour ajouter le token à chaque requête
axiosAdmin.interceptors.request.use(
  (config) => {
    const token = getValidToken();
    if (token) {
      config.headers.Authorization = token;
      // Log de la requête
      console.log("Request details:", {
        url: config.url,
        method: config.method,
        headers: {
          ...config.headers,
          Authorization: token.substring(0, 20) + "..." // Ne pas logger le token complet
        },
        data: config.data
      });
    } else {
      console.warn("No valid token available for request");
    }
    return config;
  },
  (error) => {
    console.error("Request interceptor error:", error);
    return Promise.reject(error);
  }
);

// Intercepteur pour gérer les erreurs de réponse
axiosAdmin.interceptors.response.use(
  (response) => {
    console.log("Response success:", {
      url: response.config.url,
      status: response.status
    });
    return response;
  },
  (error) => {
    if (error.response) {
      const errorDetails = {
        url: error.config?.url,
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data
      };
      console.error("Response error details:", errorDetails);

      if (error.response.status === 401) {
        // Vérifier le format du token qui a été envoyé
        const sentToken = error.config?.headers?.Authorization;
        console.error("Token verification:", {
          hasToken: !!sentToken,
          tokenFormat: sentToken ? sentToken.substring(0, 20) + "..." : "none",
          isBearer: sentToken?.startsWith("Bearer ")
        });

        // Nettoyer le localStorage si le token est invalide
        localStorage.removeItem("user");
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default axiosAdmin;
