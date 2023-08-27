import React from 'react'
import { Navigate } from 'react-router-dom'

export const PublicRoutes = ({children}) => {
  if(localStorage.getItem("jwtToken")){
    return <Navigate to="/"/>;
  }
  else{
    return children;
  }

}
