import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCartItemsList } from '../../../store/actions/CartActions/CartActions'
import Loader from '../../../components/Loader/Loader'
import './ConfirmOrder.scss'
import CartItem from './CartItem/CartItem'
import { Button } from '@mui/material'

function ConfirmOrder({handleBack, handleNext, orderDetails, setOrderDetails}) {
  const dispatch = useDispatch()
  const cartItemsListReducer = useSelector(state=>state.cartItemsListReducer)

  // useEffect(()=>{
  //   if(!cartItemsListReducer.cartItems)
  //     dispatch(getCartItemsList())
  // },[])

  return (
    <div className='overview-cart-container container-xl py-4 '>
      {
        cartItemsListReducer.loading && !cartItemsListReducer.cartItems?.cartItems?.length ?
        <Loader/>:
        <div>
          <div className="d-flex flex-column flex-lg-row">
            <div className="cart-item-container">
              {
                orderDetails.products?.map((item, index)=>{
                  return (
                    <CartItem item={item} key={index} setOrderDetails={setOrderDetails}/>
                  )
                })
              }
            </div>
            <div className="price-details shadow-sm ms-0 ms-lg-3">
              <div className="heading">Price Details</div>
              <div className="data">
                <div className="name">Price ({orderDetails.totalItems} items)</div>
                <div className="value">Rs. {orderDetails.totalPrice}</div>
              </div>
              <div className="data">
                <div className="name">Delivery Charge</div>
                <div className="value text-success"> Free</div>
              </div>
              <div className="data total">
                <div className="name">Total Amount</div>
                <div className="value">Rs. {orderDetails.totalPrice}</div>
              </div>
            </div>
          </div>
          <div className='d-flex justify-content-between my-5'>
            <Button
            color="inherit"
            type="button"
            sx={{height: '44px'}}
            onClick={handleBack}
            >
            Back
            </Button>
            <button className='save-btn shadow-sm' type='button' onClick={handleNext} >
                Proceed to payment
            </button>
        </div>
        </div>
      }
    </div>
  )
}

export default ConfirmOrder