import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../Pages/userContext.js";
const NotProtectedroute = ({ children }) => {
  const context = useContext(UserContext);
  if (!context || !context.user) {
    // user is not authenticated
    return children;
  }
  return <Navigate to="/" />;
};
export default NotProtectedroute;
