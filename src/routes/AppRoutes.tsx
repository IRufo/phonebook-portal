
import { Routes, Route } from "react-router-dom";
import AdminHome from "../pages/AdminHome";
import UserHome from "../pages/UserHome";
import Register from "../pages/auth/Register";
import AccountStatus from "../pages/auth/AccountStatus";
import withProtectedRoute from "../HOC/withAuthRedirect";
import Login from "../pages/auth/Login";


const AppRoutes = () => {

  // const ProtectedAdminDashboard = withProtectedRoute(AccountStatus, ['Admin', 'Super Admin']);
  const ProtectedAdminHome = withProtectedRoute(AdminHome, ['Admin', 'Super Admin']);
  
  return (
    <Routes>
      {/* <Route path="/login" element={<Login />} /> */}
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/account-status" element={<AccountStatus />} />
      
      <Route path="/admin" element={<AdminHome />} />  
      {/* /admin will redirect to /admin/users/all */}
      <Route path="/admin/users/:status" element={<ProtectedAdminHome />} />

      <Route path="/contacts" element={<UserHome />} />  
      <Route path="/contacts/:status" element={<UserHome />} />  

      {/* <Route path="/account-status/s" element={<ProtectedAdminDashboard />}  /> */}
    </Routes>
  );
};

export default AppRoutes;