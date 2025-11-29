import React, { Suspense, useEffect, useRef, useState } from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import Navbar from './Navbar/Navbar';
import Footer from './Footer/Footer';
import { useSelector } from 'react-redux';
import PageLoader from '../PageLoader/PageLoader';
const Layout = () => {
  const [state, setState] = useState(false)
  const navRef = useRef(null);
  const hamburgerRef = useRef(null);
  const [windowSize, windowSizeSet] = useState(null)
  const { key } = useLocation();
  const  {loadingauthcheck, userData} = useSelector(state=> state.loginReducer)


  const outsideClickHandler = (e)=>{
    if(navRef.current && state && !navRef.current.contains(e.target) && !hamburgerRef.current.contains(e.target)){
        setState(false)
    }
  }
  const toggleBtn =()=>{
    if(windowSize<992){
      if(state){
        setState(false)
      }else{
        setState(true)
      }
    }
  }

  useEffect(()=>{
      windowSizeSet(window.innerWidth)
      if(window.innerWidth <=992){
        document.addEventListener("click", outsideClickHandler);
        return () => {
            document.removeEventListener("click", outsideClickHandler);
          };
      }else{
        setState(true)
      }
  },[state])

  if(userData?.role==='admin'){
    return <Navigate to={"/admin"} />
  }


  return <>
  {
    loadingauthcheck
    ?
    <PageLoader open={loadingauthcheck}/>
    :
    <>
      <Navbar toggleBtn={toggleBtn} state={state} navRef={navRef} hamburgerRef={hamburgerRef}/>
        <div key={key}>
          <Suspense fallback={<div style={{height: 'calc(100vh - 60px)', backgroundColor: 'rgba(0, 0, 0, 0.5)'}}></div>}>        
            <Outlet />
          </Suspense>
        </div>
      <Footer />
    </>
  }
  </>;
}

export default Layout