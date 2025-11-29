import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getOrderDetails } from "../../store/actions/OrdersActions/OrdersActions";
import Loader from "../../components/Loader/Loader";
import './OrderDetails.scss'
import MetaData from "../../components/MetaData";

function OrderDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { orderDetails, orderLoading } = useSelector((state) => state.orderReducer);

  useEffect(() => {
    dispatch(getOrderDetails({id}));
  }, [dispatch, id]);


  return (
    <div className="order-details  container-xl py-4">
      <MetaData title={`order | BAZZAR.com`} />
      {
        orderLoading ?
        <Loader/>
        :
        <>
          <div className="heading">Order #{orderDetails?._id?.toUpperCase()}</div>

          <section >
            <div className="sub-heading">Shipping Info</div>
            <div><span className="fw-bold">Address: </span>{orderDetails?.shippingInfo?.address}, {orderDetails?.shippingInfo?.city}, {orderDetails?.shippingInfo?.country}</div>
            <div><span className="fw-bold">Pincode: </span>{orderDetails?.shippingInfo?.pincode}</div>
          </section>

          <hr className="my-4" />

          <section >
            <div className="sub-heading">Payment Info</div>
            <div><span className="fw-bold">Status: </span><span className="fw-bold text-success text-capitalize">{orderDetails?.paymentInfo.status}</span></div>
            <div><span className="fw-bold">Paid At:  </span>{new Date(orderDetails?.paidAt).toLocaleString()}</div>
          </section>

          <hr className="my-4" />


          <section >
            <div className="sub-heading">Order Info</div>
            <div><span className="fw-bold">Status: </span><span className="fw-bold text-success text-capitalize">{orderDetails?.orderStatus}</span></div>
            <div><span className="fw-bold">Order Date:  </span>{new Date(orderDetails?.createdAt).toLocaleString()}</div>
            <div><span className="fw-bold">Total Price:  </span>Rs. {orderDetails?.totalPrice}</div>

            <div className="fw-bold my-3">Products:</div>

            {
              orderDetails?.orderItems?.map((item, index)=>{
                return (
                  <div className="ordered-item shadow-sm mb-2 p-2 d-flex"  onClick={()=>(navigate(`/product/${item?.product?.category?.slug}/${item?.product?.slug}/${item?.product?._id}`))} key={index}>
                    <div>
                        <div className='product-img'  >
                            <img src={item?.image} alt="" />
                        </div>
                    </div>
                    <div className='px-4 content'>
                        <div className='product-details' >
                          <div className='product-name'>{item?.name}</div>
                          <div className='product-description'>{item?.product?.description}</div>
                          <div className='product-price'>Rs. {item?.price}</div>
                          <div className='out-of-stock'>Quantity: {item?.quantity}</div>
                        </div>
     
                    </div>
                </div>
                )
              })
            }
          </section>
        </>
      }
    </div>
  );
}

export default OrderDetails;
