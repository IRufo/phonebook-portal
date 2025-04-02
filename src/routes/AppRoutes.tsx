
import { Routes, Route } from "react-router-dom";
import AdminHome from "../pages/AdminHome";
import UserHome from "../pages/UserHome";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import AccountStatus from "../pages/auth/AccountStatus";
import { useAuth } from "../contexts/authContext";
import { Navigate, Outlet } from "react-router-dom";
import withProtectedRoute from "../HOC/withAuthRedirect";

const ProtectedRoute: React.FC = () => {
  const { user } = useAuth();  

  if (user === undefined) {
    return <div>Loading...</div>; 
  }

  if (user === null) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

const AppRoutes = () => {

  const ProtectedAdminDashboard = withProtectedRoute(AccountStatus);
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/account-status" element={<AccountStatus />} />
      
      <Route path="/admin" element={<AdminHome />} />  
      {/* /admin will redirect to /admin/users/all */}
      <Route path="/admin/users/:status" element={<AdminHome />} />

      <Route path="/contacts" element={<UserHome />} />  
      <Route path="/contacts/:status" element={<UserHome />} />  

      <Route path="/account-status/s" element={<ProtectedAdminDashboard />}  />
    </Routes>
  );
};

export default AppRoutes;

// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// import withAuth from "../HOC/withAuth";
// import Login from "../components/auth/Login";
// import Register from "../components/auth/Register";
// import UserDashboard from "../components/users/userDashboard";
// import AdminDashboard from "../components/admin/AdminDashboard";

// const AppRoutes = () => {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Login />} />
//         <Route path="/register" element={<Register />} />
        
//         {/* Wrapping the component properly */}
//         <Route path="/dashboard" element={<ProtectedUserDashboard />} />
//         <Route path="/admin" element={<ProtectedAdminDashboard />} />
//       </Routes>
//     </Router>
//   );
// };

// const ProtectedUserDashboard = withAuth(UserDashboard, "user");
// const ProtectedAdminDashboard = withAuth(AdminDashboard, "admin");

// export default AppRoutes;

// AppRoutes.tsx