import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { cancelOrder, getMyOrders } from "../../store/actions/OrdersActions/OrdersActions";
import './Orders.scss'
import MetaData from "../../components/MetaData";
import Loader from "../../components/Loader/Loader";
import emptyBox from '../../assets/images/empty-box.png'
import AlertModal from "../../components/AlertModal/AlertModal";

function Orders() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { myOrders, updateLoader, loading } = useSelector((state) => state.orderReducer);
  const [alertModal, setAlertModal] = useState(false)
  const [id, setId] = useState(null)

  const handleCancel=()=>{
    dispatch(cancelOrder({
      id,
      onSuccessCallback: ()=>{
        setAlertModal(false)
        setId(null);
      }
    }))
  }

  useEffect(() => {
    dispatch(getMyOrders());
  }, [dispatch]);


  return (
    <div className="orders-container  container-xl py-4" style={{ padding: "20px" }}>
      <MetaData title={`My Orders | BAZZAR.com`} />
      <div className="heading">My Orders</div>

      {
        loading ?
        <Loader/>
        :
        <>
          {!myOrders.length ? (
            <div className='fw-bold text-center'>
              <img src={emptyBox} alt="" width={'60px'} className='me-3'/>
              <div>No orders yet.</div>
            </div>
          ) : (
            myOrders.map((item) => (
              <div
              className="order-item"
                key={item._id}
              >
                <div className="cart-item shadow-sm mb-2 p-2 d-flex">
                  <div>
                  </div>
                  <div className='px-4 content'>
                    <h6>Order ID: #{item._id?.toUpperCase()}</h6>
                    <h6>Status: <span className="text-success">{item.orderStatus}</span></h6>
                    <p className="d-flex"><h6>Total Price: &nbsp; </h6> ₹{item.totalPrice}</p>
                    <div className="mb-2">
                      <button type='button' className=" view-btn" onClick={()=> navigate(`/account/orders/${item._id}`)} >  View Order</button>
                      {item.orderStatus!=='Delivered' && item.orderStatus!=='Cancelled' && <button type='button' onClick={()=>{setAlertModal(true); setId(item._id)}} className="shadow-sm cancel-order">Cancel Order</button>}
                    </div> 
                  </div>
                </div>
                {id===item._id && <AlertModal
                  alertModal={alertModal} 
                  setAlertModal={setAlertModal}
                  name="account"
                  title={'Are you sure, you want to cancel this order?'}
                  onOK={handleCancel}
                  loading={updateLoader}
                />}
              </div>
            ))
          )}
        </>
      }
      
    </div>
  );
}

export default Orders;
