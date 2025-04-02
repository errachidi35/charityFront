import { useState } from "react";
import { AuthContext } from "../context/AuthContext";

export const useSignup = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
}