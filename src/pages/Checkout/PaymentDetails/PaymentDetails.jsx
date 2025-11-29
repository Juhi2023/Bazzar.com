import React, {useState, useRef} from 'react'
import './PaymentDetails.scss'
import { useDispatch, useSelector } from 'react-redux'
import { Button } from '@mui/material'
import "react-datepicker/dist/react-datepicker.css";
import {
    useStripe,
    useElements,
    CardNumberElement,
    CardCvcElement,
    CardExpiryElement,
  } from "@stripe/react-stripe-js";
import axiosInstance from '../../../axios/axiosInstance'
import { NOTIFICATION_TYPE_ERROR, notify } from '../../../utils/notification'
import { createOrder } from '../../../store/actions/OrdersActions/OrdersActions'
import OrderSuccessModal from '../OrderSuccessModal/OrderSuccessModal';
import { useNavigate } from 'react-router-dom';
  
function PaymentDetails({handleBack, orderDetails, addressDetails}) {
    const  userAddressReducer = useSelector(state=> state.userAddressReducer)
    const {isLoggedIn, userData} =  useSelector(state=> state.loginReducer)
    const [loading, setLoading] = useState(false);
    const [orderSuccessModal, setOrderSuccessModal] = useState(false);
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const payBtn = useRef()
    const stripe = useStripe();
    const elements = useElements();

    const handlePayment = async(e)=>{ 
        e.preventDefault();
        setLoading(true)
        payBtn.current.disabled = true;

        let paymentData = {
            amount: orderDetails.totalPrice*100
        }
    
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                },
            };
            const {data} = await axiosInstance.post("/api/v1/payment/process", {data: paymentData})

            const client_secret = data.client_secret;
            if (!stripe || !elements) return;
    
            const result = await stripe.confirmCardPayment(client_secret, {
            payment_method: {
                card: elements.getElement(CardNumberElement),
                billing_details: {
                name: userData.first_name + ' ' + userData.last_name,
                email: userData.email,
                address: {
                    line1: addressDetails.address,
                    city: addressDetails.city,
                    state: addressDetails.state,
                    postal_code: addressDetails.pinCode,
                    country: "IN",
                },
                },
            },
            });
    
            if (result.error) {
                payBtn.current.disabled = false;
                notify(NOTIFICATION_TYPE_ERROR, result.error.message);
            } else {
                const order = {
                    shippingInfo: addressDetails,
                    orderItems: orderDetails?.products?.map(item=>({
                        name: item.product.name,
                        price: item.product.price,
                        quantity: item.quantity,
                        image: item.product.images[0],
                        product: item.product._id
                    })),
                    itemsPrice: orderDetails.totalPrice,
                    taxPrice: 0,
                    shippingPrice: 0,
                    totalPrice: orderDetails.totalPrice ,
                };

                if (result.paymentIntent.status === "succeeded") {
                    order.paymentInfo = {
                        id: result.paymentIntent.id,
                        status: result.paymentIntent.status,
                    };
                    dispatch(createOrder({
                        ...order,
                        onSuccessCallback: ()=>setOrderSuccessModal(true)
                    }));
        
                    // navigate("/success");
                } else {
                    notify(NOTIFICATION_TYPE_ERROR, "There's some issue while processing payment ");
                }
            }
            setLoading(false)
        } catch (error) {
            console.log(error);
            payBtn.current.disabled = false;
            setLoading(false)
        }
    }

  return (
<div className='payment-details'>
        <div className='mt-2 payment-form'>
            <div className="heading">
                PAYMENT DETAILS
            </div>
            <div className="content w-100">
                <form onSubmit={handlePayment}>
                    <div>
                        <div className="field">
                            <div className="field-name">Card Number</div>
                            <CardNumberElement className="paymentInput" />
                            {/* <div className="field-box">
                                <div className="error">
                                    <ErrorMessage name='cardNumber'/>
                                </div>
                            </div> */}
                        </div>

                        <div className="field ">
                            <div className="field-name">Expiry Date</div>
                            <CardExpiryElement className="paymentInput" />
                        </div>

                        <div className="field">
                            <div className="field-name">CVV</div>
                            <CardCvcElement className="paymentInput" />
                        </div>
                    </div>
                    <div className='d-flex justify-content-between my-5'>
                        <Button
                            ref={payBtn}
                            color="inherit"
                            type="button"
                            sx={{height: '44px'}}
                            onClick={handleBack}
                        >
                        Back
                        </Button>
                        <button className='save-btn mt-0 shadow-sm' type='submit' disabled={loading}>
                            Place order
                        </button>
                    </div>
                </form>
            </div>
        </div>
        <OrderSuccessModal 
            setOrderSuccessModal={()=>{navigate("/products", {replace: true})}}
            orderSuccessModal={orderSuccessModal}
            onOK={()=>navigate('/account/orders', {replace: true})}
        />
        </div>
    )
}

export default PaymentDetails