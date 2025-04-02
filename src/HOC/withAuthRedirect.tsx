import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/authContext"; 

const withProtectedRoute = (WrappedComponent: React.ComponentType, allowedRoles: string[]) => {
  return () => {
    const { user } = useAuth();

    if (user === undefined) {
      return <div>Loading...</div>;
    }

    if (user === null) {
      return <Navigate to="/login" replace />;
    }

    if (!allowedRoles.includes(user.role)) {
      return <Navigate to="/unauthorized" replace />;
    }

    return <WrappedComponent />;
  };
};

export default withProtectedRoute;