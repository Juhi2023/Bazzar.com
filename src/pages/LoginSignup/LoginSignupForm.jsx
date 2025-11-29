import React, { useEffect, useState } from 'react'
import { Link} from 'react-router-dom'
import { Form, Formik } from 'formik'
import loginTopSection from '../../assets/images/login-top-section.png'
import './LoginSignupForm.scss'
import InputBox from './components/InputBox/InputBox'
import { loginValidation, signUpValidation } from '../../utils/schemas'
import { useDispatch, useSelector } from 'react-redux'
import { login, removeSignUpData, signUp } from '../../store/actions/AuthActions/AuthActions'
import { CircularProgress } from '@mui/material'
import Verification from '../../components/Verification/Verification'
import MetaData from '../../components/MetaData';

function LoginSignupForm({type}) {
    const dispatch = useDispatch()
    const [showVerificationPage, setShowVerificationPage] = useState(false)
    const [phoneForOTP, setPhoneForOTP] = useState('')
    const loginReducer =  useSelector(state=> state.loginReducer)
    const signUpReducer =  useSelector(state=> state.signUpReducer)


    const handleSignUp = (values, {resetForm})=>{
        setPhoneForOTP(values.phoneNo)
        dispatch(signUp(values))
    }

    const handleLogin = (values, {resetForm})=>{
        dispatch(login(values))
        resetForm()
    }

    const handleOnchange = ()=>{
        setShowVerificationPage(false)
    }
    
    
    useEffect(()=>{
        //for signup block
        if(signUpReducer.otpSent){
            setShowVerificationPage(true)
        }else{
            setShowVerificationPage(false)
        }
    }, [signUpReducer.otpSent])

    useEffect(()=>{
        return ()=>dispatch(removeSignUpData())
    },[type])

  return (
    <>
        <div className="login-container" key={type}>
        <MetaData title={`Login | BAZZAR.com`} />
            
            <div className="login-signup-form mx-auto">

                {
                    type === 'login'
                    &&
                    <div className="login">
                        <div className="top-section">
                            <img src={loginTopSection} alt="" />
                        </div>
                        
                        <Formik
                            initialValues={{
                                email: '',
                                password:''
                              }}
                            validationSchema={loginValidation}
                            onSubmit= {handleLogin}
                        >
                            {
                                (formik)=>{
                                    return(
                                        <Form>
                                            <div className="form">
                                                <div className="heading">Login</div>

                                                <InputBox type="email" name='email' placeholder='Email'/>

                                                <InputBox type="password" name='password' placeholder='Password'/>

                                                <div className='terms-and-conditions text-end'><Link to='/forgot-password'>Forgot Password</Link></div>

                                                <div className="submit-btn">
                                                    <button type='submit' disabled={!(formik.dirty && formik.isValid)}>
                                                        {
                                                            loginReducer.loading?
                                                            <CircularProgress size={20} thickness={8} sx={{color: 'black', opacity: 1}}/>
                                                            :
                                                            'CONTINUE'
                                                        }
                                                    </button>
                                                </div>

                                                <div className='change-form mt-3'>Don't have an account? <Link to="/signup">SignUp</Link></div>
                                            </div>
                                        </Form>
                                    )
                                }
                            }
                        </Formik>
                    </div>
                }
                {
                    type === 'signup'
                    &&
                    <>
                        <div className={showVerificationPage ? "signup d-none" : "signup"}>
                        <MetaData title={`SignUp | BAZZAR.com`} />
                            <div className="top-section">
                                <img src={loginTopSection} alt="" />
                            </div>
                            <Formik
                                initialValues={{
                                    firstName:'', 
                                    lastName: '',
                                    email: '',
                                    phoneNo: '',
                                    password:''
                                }}
                                validationSchema={signUpValidation}
                                onSubmit= {handleSignUp}
                            >
                                {
                                    (formik)=>{
                                        return(
                                            <Form>
                                                <div className="form">
                                                    <div className="heading">SignUp</div>

                                                    <div className="d-flex">
                                                        <InputBox type="text" name='firstName' placeholder='First Name'/>
                                                        &nbsp;
                                                        <InputBox type="text" name='lastName' placeholder='Last Name'/>
                                                    </div>

                                                    <InputBox type="tel" name='phoneNo' placeholder='Mobile Number'/>

                                                    <InputBox type="email" name='email' placeholder='Email'/>

                                                    <InputBox type="password" name='password' placeholder='Password'/>

                                                    <div className='terms-and-conditions'>By continuing, I agree to the <a href="#">Terms of Use</a> & <a href="#">Privacy Policy</a></div>

                                                    <div className="submit-btn">
                                                        <button type='submit' disabled={!(formik.dirty && formik.isValid)}>
                                                        {
                                                            signUpReducer.loading?
                                                            <CircularProgress size={20} thickness={8} sx={{color: 'black', opacity: 1}}/>
                                                            :
                                                            'CONTINUE'
                                                        }
                                                        </button>
                                                    </div>

                                                    <div className='change-form mt-3'>Do have an account? <Link to="/login">Login</Link></div>
                                                </div>
                                            </Form>
                                        )
                                    }
                                }
                            </Formik>
                        </div>
                        
                        <div className={showVerificationPage ? "" : "d-none"}>
                            <Verification otpFor='phone' phoneForOTP={`+91-${phoneForOTP}`} handleOnchange={handleOnchange} />
                        </div>
                    </>
                }
            </div>
        </div>
    </>
  )
}

export default LoginSignupForm