
import { Routes, Route } from "react-router-dom";
import Login from "../components/auth/Login";
import Register from "../components/auth/Register";
import AccountStatus from "../components/auth/AccountStatus";
import AdminHome from "../pages/AdminHome";


const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/account-status" element={<AccountStatus />} />
      
      <Route path="/admin" element={<AdminHome />} />  
      {/* /admin will redirect to /admin/users/all */}
      <Route path="/admin/users/:status" element={<AdminHome />} />
    </Routes>
  );
};

export default AppRoutes;
