import React from 'react';
import { useSelector } from 'react-redux';
import {Navigate, Outlet} from 'react-router-dom'

const  ProtectedRoute = () => {

  const  {isLoggedIn, } = useSelector(state=> state.loginReducer)
  return isLoggedIn ? <Outlet/> : <>{localStorage.clear()} <Navigate to="/login" replace={true}/></>
}

export default ProtectedRoute;
