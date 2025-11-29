import React from 'react'
import './Product.scss'
import {AiFillStar} from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'
import { Rating } from '@mui/material'

function Product({product}) {
  const navigate = useNavigate()

  return (
    <div className='product-box p-1' onClick={()=>(navigate(`/product/${product?.category[0]?.slug}/${product?.slug}/${product?._id}`))}>
      <div className=''>
        <div className="img">
          <img src={product?.images?.[0]} alt="" />
        </div>
        <div className='content'>
          <div className="name"> {product.name}</div>
          <div className="description">{product.description} </div>


          <Rating readOnly size="small"  value={product?.rating}/>

          <div className="d-flex  align-items-center">
            <div className="price">Rs. {product.price}</div>  <div className="offer"><>&nbsp; &nbsp;</>{product?.discountPercentage && `${product?.discountPercentage} % off`}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Product

