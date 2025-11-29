import React from 'react'
import Navbar from '../../components/layout/Navbar/Navbar'
import loginTopSection from '../../assets/images/login-top-section.png'
import './ForgotPassword.scss'
import { forgotPasswordValidation } from '../../utils/schemas'
import { Form, Formik } from 'formik'
import InputBox from '../LoginSignup/components/InputBox/InputBox'
import MetaData from '../../components/MetaData';
import { useDispatch, useSelector } from 'react-redux'
import { forgotPassword } from '../../store/actions/AuthActions/AuthActions'
import { CircularProgress } from '@mui/material'

function ForgotPassword() {

    const dispatch = useDispatch()
    const {loading} = useSelector(state=> state.forgotPasswordReducer)

    const handleForgotPassword = (values, {resetForm})=>{
        dispatch(forgotPassword(values))
        resetForm()
    }

  return (
    <>
        <Navbar/>
        <div className="forgot-password-container">
        <MetaData title={`Forgot Password | BAZZAR.com`} />
            <div className="forgot-password-form mx-auto">
                <div className="forgot-password">
                    <div className="top-section">
                        <img src={loginTopSection} alt="" />
                    </div>
                    
                    <Formik
                        initialValues={{
                            email: ''
                        }}
                        validationSchema={forgotPasswordValidation}
                        onSubmit= {handleForgotPassword}
                    >
                        {
                            (formik)=>{
                                return(
                                    <Form>
                                        <div className="form">
                                            <div className="heading">Forgot Password</div>

                                            <div className="text-muted form-text">Enter the email address with your Bazzar.com account.</div>

                                            <InputBox type="email" name='email' placeholder='Email'/>

                                            <div className="submit-btn">
                                                <button type='submit' disabled={!(formik.dirty && formik.isValid)}>
                                                    {
                                                        loading?
                                                        <CircularProgress size={20} thickness={8} sx={{color: 'black', opacity: 1}}/>
                                                        :
                                                        'CONTINUE'
                                                    }
                                                </button>
                                            </div>

                                        </div>
                                    </Form>
                                )
                            }
                        }
                    </Formik>
                </div>
            </div>
        </div>
    </>
  )
}

export default ForgotPassword