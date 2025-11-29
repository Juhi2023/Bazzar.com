import React, { useEffect, useState } from 'react'
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import {RxCross2 } from 'react-icons/rx'
import './CartItem.scss'
import { Rating } from '@mui/material';
import { useDispatch } from 'react-redux';
import {addItemToCart, deleteItemFromCart} from '../../../../store/actions/CartActions/CartActions'
import { useNavigate } from 'react-router-dom';

function CartItem({item, setOrderDetails}) {
    const [quantity, setQuantity] = useState(1)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(()=>{
        setQuantity(item?.quantity)
    }, [])

    const handleDecreaseQuantity = (id)=>{
        setQuantity(prev=> {
            if(prev>1){
                setOrderDetails(prevInner=>{
                    const data = prevInner.products.filter((item)=> {
                        if(item.product._id === id)
                            item.quantity = prev-1
                      return true
                    })

                    return {
                        ...prevInner, 
                        products: data,
                        totalPrice: data.reduce((total, item)=>{
                            return total + (item.quantity * item.product?.price);
                        }, 0)
                    }
                })
                return prev-1;
            }else{
                return 1;
            }
        });
    }

    const handleIncreaseQuantity = (id)=>{
        setQuantity(prev=> {
            if(prev<10 && prev<item?.product?.stock){
                setOrderDetails(prevInner=>{
                    const data = prevInner.products.filter((item)=> {
                        if(item.product._id === id)
                            item.quantity = prev+1
                        return true
                    })

                    return {
                        ...prevInner, 
                        products: data,
                        totalPrice: data.reduce((total, item)=>{
                            return total + (item.quantity * item.product?.price);
                        }, 0)
                    }
                })
                return prev+1;
            }else{
                return prev;
            }
        });
    }

    const handleRemove = (id)=>{
        setOrderDetails(prev=>{
            const data = prev.products.filter((item)=> {
                return item.product._id !== id
              })

            if(!data.length)
              navigate(-1)

            return {
                ...prev, 
                products: data,
                totalPrice: data.reduce((total, item)=>{
                    return total + (item.quantity * item.product?.price);
                }, 0),
                totalItems: data.length
            }
          })
    }

  return (
    <div className="overview-cart-item shadow-sm mb-2 p-2 d-flex">
        <div>
            <div className='product-img'  onClick={()=>(navigate(`/product/${item?.product?.category?.slug}/${item?.product?.slug}/${item?.product?._id}`))}>
                <img src={item?.product?.images?.[0]} alt="" />
            </div>
            <div>
                <div className='mb-1 quantity-container'>
                    <button className='change-quantity-btn' onClick={()=>{handleDecreaseQuantity(item?.product?._id)}} disabled={quantity>1 ? false : true}><AiOutlineMinus size={10} color={'white'} /></button>
                    <input type="text" value={quantity} className="quantity" disabled/>
                    <button className='change-quantity-btn' onClick={()=>{handleIncreaseQuantity(item?.product?._id)}} disabled={quantity<10 && quantity<item?.product?.stock ? false : true}><AiOutlinePlus size={10} color={'white'} /></button>
                </div>
            </div>   
        </div>
        <div className='px-4 content'>
            <div className='product-details'  onClick={()=>(navigate(`/product/${item?.product?.category?.slug}/${item?.product?.slug}/${item?.product?._id}`))}>
                <div className='product-name'>{item?.product?.name}</div>
                <div className='product-description'>{item?.product?.description}</div>
                <div className='product-price'>Rs. {item?.product?.price}</div>
            </div>
            <div>
                <button type='button' className=" remove-btn" onClick={()=>{handleRemove(item?.product?._id)}}> <RxCross2/> Remove</button>
            </div>        
        </div>
    </div>
  )
}

export default CartItem