import React from 'react'
import rightArrow from '../../assets/images/right-arrow.svg'
import './Account.scss'
import { BsFillBoxSeamFill, BsFillHeartFill } from 'react-icons/bs'
import { PiUserFill } from 'react-icons/pi'
import { useDispatch } from 'react-redux'
import { logout } from '../../store/actions/AuthActions/AuthActions'
import { useNavigate } from 'react-router-dom'
import MetaData from '../../components/MetaData';

function Account() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  return (
    <div className="account-box mt-4 px-3 px-lg-5 container-xxl">
      <MetaData title={`Your Account | BAZZAR.com`} />
      <div className="heading mb-4">Your Account</div>

      <div className=' account-container '>
        <div className="account-item" onClick={()=> navigate('/account/orders')}>
          <div className='d-flex align-items-center'>
            <BsFillBoxSeamFill size={25} color='#db7800'/> &nbsp; 
            <div className='ms-3'>
              <div className="heading">Your Orders</div>
              <div className="text">Track, return and buy things again.</div>
            </div> 
          </div>
          
          <img className='arrow' src={rightArrow} alt="" />
        </div>

        <div className="account-item opacity-50">
          <div className='d-flex align-items-center'>
            <BsFillHeartFill size={25} color='red'/>
            <div className='ms-3'>
              <div className="heading">Your Wishlist</div>
              <div className="text">Track, return and buy things again.</div>
            </div>
          </div>
          
          <img className='arrow' src={rightArrow} alt="" />
        </div>

        <div className="account-item" onClick={()=> navigate('/account/profile')}>
          <div className='d-flex align-items-center'>
            <PiUserFill size={25} color='#38b2ff'/>
            <div className='ms-3'>
              <div className="heading">View Profile</div>
              <div className="text">Manage your details.</div>
            </div>
          </div>  
          <img className='arrow' src={rightArrow} alt="" /> 
        </div>

        <div className="account-item logout" onClick={()=>{dispatch(logout())}}>Logout </div>
      </div>
    </div>
  )
}

export default Account