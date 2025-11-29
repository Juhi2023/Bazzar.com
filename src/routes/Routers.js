import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Route, Routes } from 'react-router-dom'
import Layout from '../components/layout/Layout'
import Home from '../pages/Home/Home'
import Products from '../pages/Products/Products'
import ProductDetails from '../pages/ProductDetails/ProductDetails'
import Contact from '../pages/Contact/Contact'
import About from '../pages/About/About'
import ProtectedRoute from './ProtectedRoute'
import Account from '../pages/Account/Account'
import Cart from '../pages/Cart/Cart'
import Orders from '../pages/Orders/Orders'
import Profile from '../pages/Profile/Profile'
import ResetPassword from '../pages/ResetPassword/ResetPassword'
import LoginSignup from '../pages/LoginSignup/LoginSignup'
import ForgotPassword from '../pages/ForgotPassword/ForgotPassword'
import NotFound from '../pages/NotFound/NotFound'
import Checkout from '../pages/Checkout/Checkout'
import { checkAuthStatus } from '../store/actions/AuthActions/AuthActions'
import axios from 'axios'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import axiosInstance from '../axios/axiosInstance'
import OrderDetails from '../pages/OrderDetails/OrderDetails'
import AdminLayout from '../pages/Admin/AdminLayout/AdminLayout'
import Dashboard from '../pages/Admin/Dashboard/Dashboard'
import AdminProducts from '../pages/Admin/AdminProducts/AdminProducts'
import AdminOrders from '../pages/Admin/AdminOrders/AdminOrders'
import AddReviews from '../pages/Admin/AdminReviews/AdminReviews'
import AdminUsers from '../pages/Admin/AdminUsers/AdminUsers'

function Routers() {
    const dispatch = useDispatch() 
    
    useEffect(()=>{
      dispatch(checkAuthStatus())
    },[])

  return (
    <>
        <Routes>
            <Route path="/" element={<Layout/> } >
              <Route index element={<Home />} />
              <Route path="products" element={<Products/> }/>
              <Route path="product/:categorySlug/:productNameSlug/:id" element={<ProductDetails/> }/>
              <Route path="contact" element={<Contact/> } />
              <Route path="about" element={<About/> } />

              <Route path="account" element={< ProtectedRoute/> } >
                  <Route index element={<Account/> } />
                  <Route path='cart' element={<Cart/> } />
                  <Route path='orders' element={<Orders/> } />
                  <Route path='orders/:id' element={<OrderDetails/> } />
                  <Route path='profile' element={<Profile/> } />
                  <Route
                    path="checkout"
                    element={
                      process.env.REACT_APP_STRIPE_API_KEY ? (
                        <Elements stripe={loadStripe(process.env.REACT_APP_STRIPE_API_KEY)}>
                          <Checkout />
                        </Elements>
                      ) : (
                        <Checkout /> // fallback if no key
                      )
                    }
                  />
              </Route>
            </Route>

            <Route path="admin/" element={<AdminLayout/> } >
              <Route index element={<Dashboard />} />
              <Route path="products" element={<AdminProducts /> }/>
              <Route path="orders" element={<AdminOrders /> }/>
              <Route path="reviews" element={<AddReviews /> }/>
              <Route path="users" element={<AdminUsers /> }/>
            </Route>


            <Route path="reset-password/:token" element={<ResetPassword/> } />
            <Route path="forgot-password" element={<ForgotPassword/> }/>
            <Route path="login" element={<LoginSignup type="login"/> }/>
            <Route path="signup" element={<LoginSignup type="signup"/> }/>
            <Route path="*" element={<NotFound/> } />
        </Routes>
    </>
  )
}

export default Routers