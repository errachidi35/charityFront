// src/components/PrivateRoute.jsx
import { useAuthContext } from "../hooks/useAuthContext";
import { Navigate } from "react-router-dom";

export const PrivateRoute = ({ children }) => {
  const { user } = useAuthContext();

  if (!user || user.role !== "ADMIN") {
    return <Navigate to="/login" />;
  }

  return children;
};

