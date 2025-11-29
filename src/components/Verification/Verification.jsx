import React, { useEffect, useState } from 'react'
import verification from '../../assets/images/verification.jpg'
import './Verification.scss'
import { Link } from 'react-router-dom'
import OTPInput from 'react-otp-input'
import { useDispatch, useSelector } from 'react-redux'
import { CircularProgress } from '@mui/material'
import { resendOTP, verifyOTP } from '../../store/actions/AuthActions/AuthActions'

function Verification({otpFor, phoneForOTP,handleOnchange}) {
    const [otp, setOTP] = useState('')
    const {loading} =  useSelector(state=> state.verificationReducer)
    const [seconds, setSeconds] = useState(0)
    const [minutes, setMinutes] = useState(1)

    const dispatch = useDispatch()

    const handleVerifyOTP = ()=>{
        let data = {
            phoneNo: phoneForOTP,
            otp
        }
        dispatch(verifyOTP(data))
    }

    const handleResendOTP = () =>{
        let data = {
            phoneNo: phoneForOTP,
        }
        dispatch(resendOTP(data))
    }

    useEffect(() => {
        const interval = setInterval(() => {
          if (seconds > 0) {
            setSeconds(seconds - 1);
          }
      
          if (seconds === 0) {
            if (minutes === 0) {
              clearInterval(interval);
            } else {
              setSeconds(59);
              setMinutes(minutes - 1);
            }
          }
        }, 1000);
      
        return () => {
          clearInterval(interval);
        };
      }, [seconds]);

    useEffect(()=>{
        if(otp.length === 6){
            handleVerifyOTP()
        }
    }, [otp])

  return (
    <>
        <div className="verification-container">
            <div className="verification-form mx-auto">
                <div className="verification">
                    <div className="top-section">
                        <img src={verification} alt="" />
                    </div>
                    
                    <div className="form">
                        <div className="heading">Verification Code</div>

                        <div className="text-muted form-text">
                            We’ve sent a One Time Password (OTP) at number {phoneForOTP}. Please enter it to complete verification &nbsp;
                            <Link onClick={handleOnchange}>change</Link>
                        </div>

                        <div className='input-box'>
                        <OTPInput
                            value={otp}
                            onChange={setOTP}
                            inputType={"tel"}
                            numInputs={6}
                            placeholder={"------"}
                            renderSeparator={<></>}
                            renderInput={(props) => <input {...props} />}
                            shouldAutoFocus={true}
                        />
                        </div>

                        <div className="submit-btn">
                            <button type='submit' disabled={otp.length === 6 ? false : true} onClick={handleVerifyOTP}>
                            {
                                loading?
                                <CircularProgress size={20} thickness={8} sx={{color: 'black', opacity: 1}}/>
                                :
                                'VERIFY'
                            }
                            </button>
                        </div>

                        <div className='mt-3 text-center'>
                            Not received your code? 
                            {
                                !(seconds ===0 && minutes ===0)
                                ?
                                <Link onClick={handleResendOTP}> Resend OTP</Link>
                                :
                                <span className='text-muted'> {minutes < 10 ? `0${minutes}` : minutes}:{seconds < 10 ? `0${seconds}` : seconds}</span>
                            
                            }
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default Verification