import React, { useContext } from "react";
import { AuthContext } from "./Context/AuthContext";
import { Navigate } from "react-router-dom";
import Login from "../Pages/Login";

const LoginRe = () => {
  const { currentUser } = useContext(AuthContext);
  if (!currentUser) {
    return <Login />;
  }
  if (currentUser.type === "admin") return <Navigate to="/admin" replace />;
  if (currentUser.type === "user") return <Navigate to="/" replace />;
  if (currentUser.type === "medium") return <Navigate to="/" replace />;
  if (currentUser.type === "premium") return <Navigate to="/" replace />;
  return <Login />;
};

export default LoginRe;