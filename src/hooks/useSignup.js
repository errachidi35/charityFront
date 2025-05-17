import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useSignup = () => {
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(null);
    const { dispatch } = useAuthContext();

    const signup = async (prenom, nom, email, motDePasse) => {
        setIsLoading(true);
        setError(null);

        const response = await fetch('/api/auth/register', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ prenom, nom, email, motDePasse })
        })
        const json = await response.json();

        if (json.code === -1) {
            setIsLoading(false);
            setError("Signup error");
        }
        if (json.code === 1) {
            // // save in local storage
            // localStorage.setItem("user", JSON.stringify(json));

            // // update auth context 
            // dispatch({ type: 'LOGIN', payload: json })

            setIsLoading(false);
        }
    }

    return { signup, isLoading, error }
}