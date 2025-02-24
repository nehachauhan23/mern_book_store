import React from 'react'
import { Navigate } from "react-router-dom"
const adminRoute = ({ children }) => {
  const token = localStorage.getItem('token')
  if(!token){
    return(
      <Navigate to="/admin" />
    )
  }

  return children ? children : <Outlet/>
}

export default adminRoute