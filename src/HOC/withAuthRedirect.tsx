import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/authContext"; // Your custom auth context

const withProtectedRoute = (WrappedComponent: React.ComponentType) => {
  return () => {
    const { user } = useAuth(); // Get authentication status from context

    if (user === undefined) {
      return <div>Loading...</div>; // Show loading while checking user status
    }

    if (user === null) {
      return <Navigate to="/" replace />; // Redirect to login if not authenticated
    }

    return <WrappedComponent />;
  };
};

export default withProtectedRoute;
