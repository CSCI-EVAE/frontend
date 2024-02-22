import React from "react";
import { Navigate } from "react-router-dom";
import { hasRole } from "../utils/authUtils";

interface ProtectedRouteProps {
    children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const user = localStorage.getItem("user")
        ? JSON.parse(localStorage.getItem("user") as string)
        : null;
    const requiredRole = user && user.role ? user.role : "USER";
    if (!hasRole(requiredRole)) {
        return <Navigate to="/login" replace />;
    }

    return <>{children}</>;
};

export default ProtectedRoute;
