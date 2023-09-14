import React from 'react'
import { Navigate } from 'react-router-dom'
const Protectedroute =({ isSignedIn, children })=> {
  if (!isSignedIn) {
    return <Navigate to="/" replace />
  }
  return children
}
export default Protectedroute