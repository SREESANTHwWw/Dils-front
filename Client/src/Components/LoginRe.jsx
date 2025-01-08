import React, { useContext } from "react";
import { AuthContext } from "./Context/AuthContext";
import { Navigate } from "react-router-dom";
import Login from "../Pages/Login";

const LoginRe = () => {
  const { currentUser } = useContext(AuthContext);
 
  if (!currentUser) {
    return <Login />;
  }
  if (currentUser.type === "admin") return <Navigate to="/admin/dashboard" replace />;
  if (currentUser.type === "User") return <Navigate to="/" replace />;
  if (currentUser.type === "Medium") return <Navigate to="/" replace />;
  if (currentUser.type === "Premium") return <Navigate to="/" replace />;
}

export default LoginRe;