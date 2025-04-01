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
import { Routes, Route } from "react-router-dom";
import Login from "../components/auth/Login";
import Register from "../components/auth/Register";
// import AccountStatus from "../components/auth/AccountStatus";


const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      {/* <Route path="/account-status" element={<AccountStatus />} /> */}
      {/* <Route path="/profile" element={<ProfilePage />} /> */}
    </Routes>
  );
};

export default AppRoutes;
