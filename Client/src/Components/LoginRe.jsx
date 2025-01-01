import React, { useContext } from "react";
import { AuthContext } from "./Context/AuthContext";
import { Navigate } from "react-router-dom";
import Login from "../Pages/Login";

const LoginRe = () => {
  const { currentUser } = useContext(AuthContext);

  // If no user is logged in, show the login page
  if (!currentUser) {
    return <Login />;
  }

  // Navigate based on user type
  switch (currentUser?.type) {
    case "admin":
      return <Navigate to="/admin" replace />;
    case "user":
    case "medium":
    case "premium":
      return <Navigate to="/" replace />;
    default:
      // Fallback for unknown user types
      return <Navigate to="/login" replace />;
  }
};

export default LoginRe;
