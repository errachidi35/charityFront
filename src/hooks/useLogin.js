import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = useAuthContext();
  const navigate = useNavigate();

  const login = async (email, password) => {
    setIsLoading(true);
    setError(null);
    console.log("Tentative de connexion avec:", { email }); // Log pour debug

    try {
      // Afficher les données envoyées
      console.log("Données envoyées:", { email, motDePasse: password });

      const response = await axios.post(
        "http://localhost:8080/api/auth/login",
        { email, motDePasse: password },
        {
          headers: { 
            "Content-Type": "application/json",
            "Accept": "application/json"
          }
        }
      );

      // Log de la réponse complète
      console.log("Réponse du serveur:", response);

      const data = response.data;
      console.log("Données reçues:", data); // Log pour debug

      if (!data) {
        throw new Error("Aucune donnée reçue du serveur");
      }

      if (!data.token) {
        throw new Error("Token manquant dans la réponse");
      }

      if (!data.role) {
        throw new Error("Rôle manquant dans la réponse");
      }

      // Créer l'objet utilisateur avec le token
      const userWithToken = {
        id: data.id,
        email: data.email,
        role: data.role,
        token: data.token
      };

      console.log("Utilisateur créé:", userWithToken); // Log pour debug

      // Stocker dans localStorage
      localStorage.setItem("user", JSON.stringify(userWithToken));

      // Dispatch pour le context
      dispatch({ type: "LOGIN", payload: userWithToken });

      // Log avant redirection
      console.log("Redirection vers:", data.role);

     
    } catch (err) {
      console.error("Erreur détaillée:", {
        message: err.message,
        response: err.response?.data,
        status: err.response?.status
      });

      setError(
        err.response?.data?.message || 
        err.message || 
        "Erreur de connexion"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return { login, isLoading, error };
};