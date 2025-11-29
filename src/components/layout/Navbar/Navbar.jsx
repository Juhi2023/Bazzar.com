import React, { useState } from 'react'
import logo from "../../../assets/images/logo.png"
import "./navbar.scss"
import { NavLink ,Link, useLocation, useNavigate, createSearchParams} from 'react-router-dom';
import { FaBars } from 'react-icons/fa'
import {RxCross2} from 'react-icons/rx';
import {PiShoppingCartThin, PiUserCircleLight} from 'react-icons/pi'
import { sidebarData } from '../../../data/sidebarData';
import { useSelector } from 'react-redux';
import { Tooltip } from '@mui/material';
import ProfileDropdown from '../ProfileDropdown/ProfileDropdown';
import { BsSearch } from "react-icons/bs";
import SearchBox from '../../SearchBox/SearchBox';

function Navbar({toggleBtn, hamburgerRef, state, navRef}) {
  const {pathname} = useLocation()
  const {isLoggedIn, userData} =  useSelector(state=> state.loginReducer)
  const [searchText, setSearchText] = useState("")
  const navigate = useNavigate()

  const handleSearch = ()=>{
    if(searchText){
      navigate({
        pathname: '/products',    

        search: `?${createSearchParams([["keyword", searchText]])}`,
      })
    }
  }

  return (
    <>
      <div className='navbar-top shadow-sm'>
        <div className="section-1">
          <div className='container-xxl h-100 px-3 px-lg-5 d-flex justify-content-between align-items-center'>
            <div className="logo mx-2 d-flex align-items-center">
              <span className='d-inline d-lg-none' ref={hamburgerRef} onClick={toggleBtn}><FaBars/></span>
              <span  onClick={()=>{navigate('/')}} style={{cursor: 'pointer'}}>
                <img src={logo} className='ms-3 mx-lg-0' alt="" />
                &nbsp; BAZZAR.com
              </span>
            </div>
            <SearchBox
              width='40%'
              onChange={(value)=>{setSearchText(value)}}
              onClick={handleSearch}
            />
            

            {
                !isLoggedIn ?
                  <div className="login-btn">
                    <Link to='/login' type="button">Login</Link>
                  </div>
                :
                <div className="right-icons d-flex ">
                  <div className='d-flex align-items-center'>
                    {/* <Tooltip title="Wishlist" arrow>
                      <Link className="nav-link px-1 fs-4" to="account/wishlist"><PiHeartStraightLight size={20}/></Link>
                    </Tooltip> */}
                    <Tooltip title="Cart" arrow>
                      <Link className="nav-link px-1 fs-4" to="account/cart">
                        {!!userData?.cartItemsCount && <span className='status'>{userData?.cartItemsCount}</span>}
                        <PiShoppingCartThin size={20} color='white'/>
                      </Link>
                    </Tooltip>
                    {
                      window.innerWidth<=992 ?
                      <Tooltip title="View Profile" arrow>
                        <Link className="nav-link px-1 fs-4" to="account"><PiUserCircleLight size={23} color='white'/></Link>
                      </Tooltip>
                      :
                      <ProfileDropdown/>
                    }
                  </div>
                </div>
              }

          </div>
        </div>
        
        <div className="container-xxl px-2">
          <div className="d-flex justify-content-center px-0 px-md-4">

            <div className="navbar d-flex " ref={navRef} style={{left: window.innerWidth >=992 ? "0px" : (state ? "0px": "-250px")}}>
              <div className='text-end px-4 d-block d-lg-none'>
                <RxCross2 onClick={toggleBtn}/>
              </div>
              <div className="logo text-center my-4 d-flex justify-content-center align-items-center d-lg-none text-dark">
                <img src={logo} className='ms-3 mx-lg-0' alt="" />
                &nbsp; BAZZAR.com
              </div>

              {
                sidebarData.map((item, index)=>{
                  return(
                    <NavLink end to={item.path} className={({ isActive }) => isActive ? "link-box active" : "link-box"} onClick={toggleBtn} key={index}>
                      <div className="aside-link"> 
                        <span className="aside-icon">{item.icon}</span> 
                        <span>{item.title}</span>
                      </div>
                    </NavLink>
                  )
                })
              }

              
            </div>

            
          </div>
        </div>
      </div>
    </>
  )
}

export default Navbar