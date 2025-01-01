import React, { useContext, useEffect } from "react";
import {  Navigate, useNavigate } from "react-router-dom";
import { AuthContext } from "./Context/AuthContext";

const ProtectedRoute = ({ children,allowedTypes }) => {
  

  const { currentUser} = useContext(AuthContext);
  
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }
  if (allowedTypes && !allowedTypes.includes(currentUser.type)) {
    return <Navigate to="/login" replace />;
  }

  return children;
};
  


export default ProtectedRoute;
