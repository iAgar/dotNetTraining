import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { UserContext } from './UserContext';
const ProtectedrouteAdmin =({children} )=> {
    const context = useContext(UserContext);
    if (!context || !context.user || !context.user.isAdmin) {
      // user is not authenticated
      return <Navigate to="/" />;
    }
    return children;
}
export default ProtectedrouteAdmin;