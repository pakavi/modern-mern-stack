import React from "react";
import { Navigate } from "react-router-dom";

import { UseAppContext } from "../context/appContext";


const ProtectedRoute = ({ children }) => {
  const { user } = UseAppContext();

  if (!user) 
    return <Navigate to="/landing" />;
    
  return children;
};

export default ProtectedRoute;
