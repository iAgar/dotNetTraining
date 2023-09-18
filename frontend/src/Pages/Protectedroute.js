import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { UserContext } from './userContext.js';
const Protectedroute =({children} )=> {
    const context = useContext(UserContext);
    if (!context || !context.user) {
      // user is not authenticated
      return <Navigate to="/SignIn" />;
    }
    return children;
}
export default Protectedroute