import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// PublicRoute component to prevent authenticated users from accessing login/register pages
const PublicRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth();

  // Redirect to dashboard if user is already authenticated
  return isAuthenticated ? <Navigate to="/dashboard" /> : <>{children}</>;
};

export default PublicRoute;
