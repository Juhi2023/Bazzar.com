import React, { useEffect, useState } from 'react'
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import {RxCross2 } from 'react-icons/rx'
import './CartItem.scss'
import { Rating } from '@mui/material';
import { useDispatch } from 'react-redux';
import {addItemToCart, deleteItemFromCart} from '../../../store/actions/CartActions/CartActions'
import { useNavigate } from 'react-router-dom';

function CartItem({item}) {
    const [quantity, setQuantity] = useState(1)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(()=>{
        setQuantity(item?.quantity)
    }, [])

    const handleDecreaseQuantity = ()=>{
        setQuantity(prev=> {
            if(prev>1){
                dispatch(addItemToCart({quantity: prev-1, productId: item?.product._id, productName: item?.product?.name}))
                return prev-1;
            }else{
                return 1;
            }
        });
    }

    const handleIncreaseQuantity = ()=>{
        setQuantity(prev=> {
            if(prev<10 && prev<item?.product?.stock){
                dispatch(addItemToCart({quantity: prev+1, productId: item?.product._id, productName: item?.product?.name}))
                return prev+1;
            }else{
                return prev;
            }
        });
    }

    const handleRemove = ()=>{
        dispatch(deleteItemFromCart({productId: item?.product?._id})); 
    }

    const buyNow = ()=>{
        navigate("/account/checkout", { state: { productId: item?.product?._id, qty: quantity }});
      }

  return (
    <div className="cart-item shadow-sm mb-2 p-2 d-flex">
        <div>
            <div className='product-img'  onClick={()=>(navigate(`/product/${item?.product?.category?.slug}/${item?.product?.slug}/${item?.product?._id}`))}>
                <img src={item?.product?.images?.[0]} alt="" />
            </div>
            {
                item?.product?.stock ?
                <div>
                    <div className='mb-1 quantity-container'>
                        <button className='change-quantity-btn' onClick={handleDecreaseQuantity} disabled={quantity>1 ? false : true}><AiOutlineMinus size={10} color={'white'} /></button>
                        <input type="text" value={quantity} className="quantity" disabled/>
                        <button className='change-quantity-btn' onClick={handleIncreaseQuantity} disabled={quantity<10 && quantity<item?.product?.stock ? false : true}><AiOutlinePlus size={10} color={'white'} /></button>
                    </div>
                    <div className='out-of-stock'>{item?.product?.stock < item?.quantity ? `Only ${item?.product?.stock} left`: 'Only few left'}</div>
                </div>                
                :
                <div className='out-of-stock'>Out of Stock</div>
            }
        </div>
        <div className='px-4 content'>
            <div className='product-details'  onClick={()=>(navigate(`/product/${item?.product?.category?.slug}/${item?.product?.slug}/${item?.product?._id}`))}>
                <div className='product-name'>{item?.product?.name}</div>
                <div className='product-description'>{item?.product?.description}</div>
                <div className='product-rating'><Rating readOnly size="small"  value={item?.product?.rating}/> &nbsp; ({item?.product?.numOfReviews} reviews)</div>
                <div className='product-price'>Rs. {item?.product?.price}</div>
            </div>
            <div>
                <button type='button' className="shadow-sm buy-now" onClick={buyNow} disabled={item?.product?.stock ? false : true}>Buy Now</button>
                <button type='button' className=" remove-btn" onClick={handleRemove}> <RxCross2/> Remove</button>
            </div>        
        </div>
    </div>
  )
}

export default CartItem