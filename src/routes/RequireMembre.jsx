import { Navigate } from "react-router-dom";

export const RequireMembre = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user || user.role !== "MEMBRE") {
    return <Navigate to="/login" replace />;
  }

  return children;
};
