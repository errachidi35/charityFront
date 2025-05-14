import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useLogin = () => {
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(null);
    const { dispatch } = useAuthContext();

    const login = async (email, motDePasse) => {
        setIsLoading(true);
        setError(null);

        const response = await fetch('/api/auth/login', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, motDePasse })
        })
        const json = await response.json();

        if (!response.ok) {
            setIsLoading(false);
            setError("login error");
        }
        if (response.ok) {
            // save in local storage
            localStorage.setItem("user", JSON.stringify(json));

            // update auth context 
            dispatch({ type: 'LOGIN', payload: json })

            setIsLoading(false);
        }
    }

    return { login, isLoading, error }
}