import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteReview, getProductDetails } from '../../store/actions/ProductActions/ProductActions';
import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import moment from 'moment';
import { AiOutlineMinus , AiOutlinePlus , AiFillStar } from 'react-icons/ai';
import star from '../../assets/images/star.svg'
import deleteIcon from '../../assets/images/delete.svg'
import './ProductDetails.scss'
import ProductDetailSkeleton from '../../components/Loader/ProductDetailSkeleton';
import MetaData from '../../components/MetaData';
import { CircularProgress, LinearProgress } from '@mui/material';
import { addItemToCart } from '../../store/actions/CartActions/CartActions';
import { FaShoppingCart } from "react-icons/fa";
import ReviewModal from '../../components/ReviewModal/ReviewModal';
import * as toxicity from '@tensorflow-models/toxicity';

function ProductDetails() {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const {id} = useParams()
  const {isLoggedIn, userData} = useSelector(state=>state.loginReducer)
  const {loading, productDetail, error} = useSelector(state=>state.productDetailsReducer)
  const cartItemsListReducer = useSelector(state=>state.cartItemsListReducer)
  const [currentImg, setCurrentImg] = useState("")
  const [quantity, setQuantity] = useState(1)
  const [isOpen, setIsOpen] = useState(false)
  const [model, setModel] = useState(null)

  const rating = [
    {
      rating: 5,
      color: '#388E3C'
    },
    {
      rating: 4,
      color: '#388E3C'
    },
    {
      rating: 3,
      color: '#388E3C'
    },
    {
      rating: 2,
      color: '#F7A032'
    },
    {
      rating: 1,
      color: '#F74343'
    },
  ]

  const buyNow = ()=>{
    navigate("/account/checkout", { state: { productId: id, qty: quantity }});
  }

  const handleAddToCart = ()=>{
    if(!isLoggedIn){
      navigate('/login')
      return
    }
    dispatch(addItemToCart({quantity, productId: productDetail._id}))
  }

  const handleDelete=()=>{
    dispatch(deleteReview({
      productId: id,
      reviewId: productDetail.reviews?.find(item=> item.isUserReview)._id
    }))
  }
  
  const handleRate = ()=>{
    if(!isLoggedIn){
      navigate('/login')
      return
    }
    setIsOpen(true)
  }

  useEffect(()=>{
    toxicity.load(0.8).then((mod) => setModel(mod));
    dispatch(getProductDetails({id}))
  }, [])

  useEffect(()=>{
    setCurrentImg(productDetail?.images?.[0])
  }, [productDetail])

  return (
    <div className='product-detail container-xxl py-5 '>
      {
        loading ?
        <ProductDetailSkeleton/>
        :
        productDetail && <div className='d-flex product-detail-container px-2 px-xxl-5'>
          <MetaData title={`${productDetail?.name}`} />

          <div className="img-container">
            <div className="selected-img">
              <img src={currentImg} alt="" />
            </div>
            <div className="image-list">
              {
                productDetail?.images?.map((item, index)=>(
                  <div className={currentImg===item ? 'image-list-item active' : 'image-list-item'} key={index} onMouseEnter={()=>{setCurrentImg(item)}}>
                    <img src={item} alt="" />
                  </div>
                ))
              }
            </div>
          </div>
          <div className="content">
            <div className="product-name">
              {productDetail?.name}
            </div>
            <div className='d-flex mb-2'>
            <div className="rating"><span>{productDetail?.rating}</span> &nbsp;<AiFillStar size={10}/> </div>
              <span> &nbsp; &nbsp;</span>
              <div className="reviews"><span>{productDetail?.numOfReviews ? productDetail?.numOfReviews: 'No'}</span> reviews</div>
            </div>
            <div className="price">
              ₹ {productDetail?.price}
            </div>
            <div className="about">
              <div className="row g-0">
                <div className="col-12 col-sm-3 col-md-2"><div className="title">Description</div></div>
                <div className="col-12 col-sm-9 col-md-10"><div className="value">{productDetail?.description}</div></div>
              </div>
              <div className="row g-0">
                <div className="col-12 col-sm-3 col-md-2"><div className="title">Category</div></div>
                <div className="col-12 col-sm-9 col-md-10"><div className="value">{productDetail?.category?.name}</div></div>
              </div>
              <div className="row g-0">
                <div className="col-12 col-sm-3 col-md-2"><div className="title">Stock</div></div>
                <div className="col-12 col-sm-9 col-md-10"><div className={productDetail?.stock ? "value fw-bold text-success" : "value fw-bold text-danger"}>{productDetail?.stock ? "In Stock" : "Out Of Stock"}</div></div>
              </div>
            </div>

            <div className="btn-container">
              {
                (!productDetail?.addedInCart && !!productDetail?.stock) &&
                <div className='mb-3 quantity-container shadow-sm'>
                  <button className='change-quantity-btn' onClick={()=>{setQuantity(prev=> prev>1 ? prev-1 : 1)}} disabled={quantity>1? false : true}><AiOutlineMinus size={12} color={''} /></button>
                  <input type="text" value={quantity} className="quantity" disabled/>
                  <button className='change-quantity-btn' onClick={()=>{setQuantity(prev=> prev<20 && prev<productDetail?.stock ? prev+1 : prev)}} disabled={quantity<10 && quantity<productDetail?.stock ? false : true}><AiOutlinePlus size={12} color={''} /></button>
                </div>
              }
              <div>
                {
                  productDetail?.addedInCart  ?
                  <button type='button' className="shadow-sm add-to-cart" onClick={()=>navigate('/account/cart')}>
                    {
                      cartItemsListReducer.loading
                      ?
                      <CircularProgress size={20} thickness={8} sx={{color: 'black', opacity: 1}}/>:
                      <><FaShoppingCart/> &nbsp; Go To Cart</>
                    }
                  </button>
                  :
                  <button type='button' className="shadow-sm add-to-cart" onClick={handleAddToCart} disabled={productDetail?.stock ? false : true}><FaShoppingCart/> &nbsp; Add To Cart</button>
                }
                <button type='button' className="shadow-sm buy-now" disabled={productDetail?.stock ? false : true} onClick={buyNow}>Buy Now</button>
              </div>
            </div>

            <div className="reviews-container p-3">
              <div className="heading">
                <div>Ratings & Reviews</div>
                {productDetail?.canReview && <button type="button" onClick={handleRate} className='rate-btn'>Rate Product</button>}
              </div>
              <div className="rating-box">
                <div className='rating-data'>
                  <div className='total-rating'><span>{productDetail?.rating}</span> &nbsp; <img src={star} alt="" /> </div>
                  <div className='total-review'><span>({productDetail?.numOfReviews ? productDetail?.numOfReviews: 'No'}</span> reviews )</div>
                </div>
                <div className="all-5-star-rating">
                  {
                    rating?.map((rate, index)=>{
                        return (
                          <div className='d-flex align-items-center' key={index}>
                            <div className='d-flex align-items-center me-2' style={{width: '30px'}}>{rate.rating} &nbsp; <img src={star} alt="" /></div>
                            <LinearProgress 
                              value={productDetail?.reviews?.length ? (productDetail?.reviews?.filter((item)=>item.rating=== rate.rating)).length/productDetail?.reviews?.length * 100 : 0} 
                              width={100} 
                              variant='determinate' 
                              sx={{width: '100px', borderRadius: '2px', marginRight: '10px', '& .MuiLinearProgress-bar1Determinate': {
                                backgroundColor: rate.color,
                              }}}/>
                              <div className="count">{(productDetail?.reviews?.filter((item)=>item.rating=== rate.rating))?.length}</div>
                          </div>
                        )
                    })
                  }
                </div>
              </div>
              <div className='review-box'>
                {
                  productDetail?.reviews?.length ?
                  <>
                    {
                      productDetail?.reviews?.map((item, index)=>{
                        return (
                          <div className="review" key={index}>
                            <div className="rating"><span>{item?.rating}</span> &nbsp;<AiFillStar size={10}/> </div>
                            <div className='d-flex'>
                              <div className="comment mt-1">{item?.comment}</div>
                            </div>
                            <div className="d-flex pt-3 justify-content-end">
                              <div className="user-details">
                                {item.name}
                              </div>
                              <div className="post-time">
                                , Posted on {moment(item?.createdAt).format("MMM, YYYY")}
                              </div>
                              {item.isUserReview && <img className='ms-2' src={deleteIcon} onClick={handleDelete} alt="" />}
                            </div>
                          </div>
                        )
                      })
                    }
                  </>
                  :
                  <div className='empty-review'>No Reviews yet</div>
                }
              </div>
            </div>
          </div>
        </div>
      }
      <ReviewModal
        model={model}
        data={productDetail}
        open={isOpen}
        handleClose={()=>setIsOpen(false)}
      />
    </div>
  )
}

export default ProductDetails