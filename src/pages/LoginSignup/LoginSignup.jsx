import React from 'react'
import Navbar from '../../components/layout/Navbar/Navbar'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import LoginSignupForm from './LoginSignupForm'


function LoginSignup({type}) {
    const loginReducer =  useSelector(state=> state.loginReducer)

    const isLoggedIn =  localStorage.getItem('isLoggedIn')
    if(isLoggedIn?.toLowerCase() === 'true'  ||  loginReducer.isLoggedIn){
        return loginReducer.userData?.role==='admin' ? <Navigate to='/admin'/> : <Navigate to='/'/>
    }

  return (
    <>
        <Navbar/>
        <LoginSignupForm type={type}/>
    </>
  )
}

export default LoginSignup