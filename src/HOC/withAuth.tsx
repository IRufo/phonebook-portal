import { getCookie } from "../utils/cacheCookie";
import React from 'react';
import { Navigate } from "react-router-dom";

const withAuthRedirect = (WrappedComponent: React.ComponentType) => {
  const AuthRedirectHOC = (props: any) => {
    const token = getCookie('token'); 

    if (token) {
     return <Navigate to="/dashboard" replace />
    }

    return <WrappedComponent {...props} />;
  };

  return AuthRedirectHOC;
};

export default withAuthRedirect;
