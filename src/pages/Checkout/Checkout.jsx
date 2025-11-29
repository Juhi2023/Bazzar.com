import React, {useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import MetaData from '../../components/MetaData';
import AddressDetailsForm from './AddressDetailsForm/AddressDetailsForm';
import ConfirmOrder from './ConfirmOrder/ConfirmOrder'
import PaymentDetails from './PaymentDetails/PaymentDetails'
import { getUserAddress } from '../../store/actions/AuthActions/AuthActions';
import { useDispatch, useSelector } from 'react-redux';
import { CircularProgress, StepContent } from '@mui/material';
import  './Checkout.scss'
import { useLocation, useNavigate } from 'react-router-dom';
import { getProductDetails } from '../../store/actions/ProductActions/ProductActions';

const steps = ['Shipping', 'Review your order', 'Payment Details'];


export default function Checkout() {
  const location = useLocation();
  let navigate = useNavigate()
  let productId=location.state?.productId;
  let qty = location.state?.qty;

  const  userAddressReducer = useSelector(state=> state.userAddressReducer)
  const cartItemsListReducer = useSelector(state=>state.cartItemsListReducer)
  const productDetailsReducer = useSelector(state=>state.productDetailsReducer)
  
  const [activeStep, setActiveStep] = React.useState(0);
  const [addressDetails, setAddressDetails] = useState({})
  const [orderDetails, setOrderDetails] = useState({products: [], totalPrice: 0, totalItems: 0})
  const dispatch = useDispatch()


  const totalSteps = () => {
    return steps.length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const handleNext = () => {
    if(!isLastStep())
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  function _renderStepContent(step) {

    switch (step) {
      case 0:
        return <AddressDetailsForm  handleBack={handleBack} handleNext={handleNext}  addressDetails={addressDetails} setAddressDetails={setAddressDetails} />;
      case 1:
        return <ConfirmOrder handleBack={handleBack} handleNext={handleNext} orderDetails={orderDetails} setOrderDetails={setOrderDetails}/>;
      case 2:
        return <PaymentDetails handleBack={handleBack} handleNext={handleNext} addressDetails={addressDetails} orderDetails={orderDetails} />;
      default:
        return <div>Not Found</div>;
    }
  }

  
  useEffect(()=>{
    if(!userAddressReducer.userAdress){
      dispatch(getUserAddress())
    }

    if(productId){
      dispatch(getProductDetails({id: productId}))
    }else if(cartItemsListReducer?.cartItems?.cartItems){
      if(cartItemsListReducer?.cartItems?.cartItems){
        const data = cartItemsListReducer?.cartItems?.cartItems.filter((item)=> {
          if(item.quantity> item.product.stock)
            item.quantity = item.product.stock
          return item.product.stock !== 0
        })
    
        setOrderDetails(prev=>{
          return {...prev, products: data,
          totalItems: data.length,
          totalPrice: data.reduce((total, item)=>{
            return total + (item.quantity * item.product?.price);
          }, 0)
        }
      }) 
      }
    }else{
      navigate(-1)
    }
}, [])

  useEffect(()=>{
    if(!userAddressReducer.loading && !userAddressReducer.error){
      setAddressDetails(userAddressReducer.userAddress)
    }
  }, [userAddressReducer.userAddress])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [activeStep])


  useEffect(()=>{
    if(productId && productDetailsReducer?.productDetail){
      let details = JSON.parse(JSON.stringify(productDetailsReducer.productDetail))
      setOrderDetails(prev=>{
        return {
          products: [{
            product: details,
            quantity: qty,
            _id: details?._id
          }],
          totalItems: 1,
          totalPrice: details.price *qty
        }
      }) 
    }
    
  }, [productDetailsReducer?.productDetail])

  return (
    <div className="container-xl px-4 checkout">
      <Box sx={{ width: '100%', my:5 }}>
        <MetaData title={`Checkout | BAZZAR.com`} />
        <Stepper activeStep={activeStep} orientation='vertical'>
          {steps.map((label, index) => (
            <Step key={label}>{console.log(orderDetails)}
              <StepButton color="inherit" onClick={handleStep(index)} className='shadow-sm bg-light position-sticky  w-100'>
                {label}
              </StepButton>
              <StepContent className='ps-lg-5' transitionDuration={300} TransitionProps={{mountOnEnter:true, unmountOnExit: true}}>
                <div className='pt-4'>
                  {_renderStepContent(index)}
                </div>
              </StepContent>
            </Step>
          ))}
        </Stepper>
      </Box>
    </div>
  );
}