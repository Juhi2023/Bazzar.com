import React, { useEffect } from 'react'
import { resetPasswordValidation } from '../../utils/schemas'
import { Form, Formik } from 'formik'
import InputBox from '../LoginSignup/components/InputBox/InputBox'
import MetaData from '../../components/MetaData';
import { useDispatch, useSelector } from 'react-redux'
import { checkResetPasswordToken, resetPassword } from '../../store/actions/AuthActions/AuthActions'
import logo from "../../assets/images/logo.png"
import './ResetPassword.scss'
import { useParams } from 'react-router-dom'

function ResetPassword() {

    const dispatch = useDispatch()
    const {token} = useParams()

    const handleResetPassword = (values, {resetForm})=>{
        dispatch(resetPassword({...values, token}))
        resetForm()
    }

    useEffect(()=>{
        dispatch(checkResetPasswordToken({token}))
    }, [])

  return (
    <>
        <div className="reset-password-container">
            <MetaData title={`Reset Password | BAZZAR.com`} />
            <div className="logo m-2 mb-5 d-flex justify-content-center align-items-center">
              <img src={logo} className='ms-3 mx-lg-0' alt="" />
              &nbsp; BAZZAR.com
            </div>
            <div className="reset-password-form mx-auto">
                <div className="reset-password">

                    <Formik
                        initialValues={{
                            password: ''
                        }}
                        validationSchema={resetPasswordValidation}
                        onSubmit= {handleResetPassword}
                    >
                        {
                            (formik)=>{
                                return(
                                    <Form>
                                        <div className="form">
                                            <div className="heading">Reset Password</div>

                                            <div className="text-muted form-text">Enter new password.</div>

                                            <InputBox type="password" name='password' placeholder='New Password'/>

                                            <div className="submit-btn">
                                                <button type='submit' disabled={!(formik.dirty && formik.isValid)}>
                                                    {
                                                        // loading?
                                                        // <CircularProgress size={20} thickness={8} sx={{color: 'black', opacity: 1}}/>
                                                        // :
                                                        'CHANGE PASSWORD'
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

export default ResetPassword