
import { Routes, Route, Navigate } from "react-router-dom";
import AdminHome from "../pages/AdminHome";
import UserHome from "../pages/UserHome";
import Register from "../pages/auth/Register";
import AccountStatus from "../pages/auth/AccountStatus";
import withProtectedRoute from "../HOC/withAuthRedirect";
import Login from "../pages/auth/Login";


const AppRoutes = () => {

  const ProtectedAdminHome = withProtectedRoute(AdminHome, ['Admin', 'Super Admin']);
  const ProtectedUserHome = withProtectedRoute(UserHome, ['User']);
  
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/account-status" element={<AccountStatus />} />
      
      <Route path="/admin/users/:status" element={<ProtectedAdminHome />} />

      <Route path="/contacts/:status" element={<ProtectedUserHome />} />  

    </Routes>
  );
};

export default AppRoutes;