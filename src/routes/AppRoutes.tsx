
import { Routes, Route } from "react-router-dom";
import Login from "../components/auth/Login";
import Register from "../components/auth/Register";
import AccountStatus from "../components/auth/AccountStatus";


const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/account-status" element={<AccountStatus />} />
      {/* <Route path="/profile" element={<ProfilePage />} /> */}
    </Routes>
  );
};

export default AppRoutes;
