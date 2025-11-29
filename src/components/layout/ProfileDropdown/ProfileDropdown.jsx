import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import arrowDownIcon from '../../../assets/images/arrow-down-white.svg'
import './ProfileDropdown.scss'
import { logout } from '../../../store/actions/AuthActions/AuthActions'


export default function ProfileDropdown() {
    const [state, setState] = useState(false)
    const dropRef = useRef(null);
    const dispatch = useDispatch()
    const {isLoggedIn, userData} =  useSelector(state=> state.loginReducer)

    const handleLogout = (e)=>{
      e.preventDefault()
      dispatch(logout())
    }

    const outsideClickHandler = (e)=>{
      if(dropRef.current && state && !dropRef.current?.contains(e.target)){
        setState(false)
      }else if(!state && dropRef.current?.contains(e.target)){
          setState(true)
      }else if(state && dropRef.current?.contains(e.target)){
          setState(false)
      }
    }

    useEffect(()=>{
      document.addEventListener("click", outsideClickHandler);
      return () => {
          document.removeEventListener("click", outsideClickHandler);
        };
    })


  return (
    <div id='profile-dropdown'  ref={dropRef}>
      <button type="button" className='d-flex justify-content-between align-items-center'>
        <div className='d-flex align-items-center w-100'>
          <span className='d-none d-md-block text-capitalize text-start overflow-hidden mx-3 user-name'>{userData.first_name + " " + userData.last_name}</span>
        </div>
        <div>
            <img src={arrowDownIcon} className={state? 'active arrow': 'arrow'} alt="" />
        </div>
      </button>
      {
        state 
        &&
        <div id="user-options">
          <Link to="/account">Your Account</Link>
          <Link to="/account/orders">Your Orders</Link>
          <Link to="/account/cart">Your cart</Link>
          <div className="hr"> </div>
          <a href="/#" onClick={handleLogout}>Sign Out</a>
        </div>
      }
    </div>
    
  );
}
