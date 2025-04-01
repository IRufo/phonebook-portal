import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/authContext";

const withAuth = (Component: React.ComponentType, role?: "user" | "admin") => {
  return function AuthComponent(props: any) {
    const { user } = useAuth();
    if (!user) return <Navigate to="/" replace />;
    if (role && user.role !== role) return <Navigate to="/unauthorized" replace />;
    return <Component {...props} />;
  };
};

export default withAuth;
