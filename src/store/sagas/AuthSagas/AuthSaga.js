import { call, put, takeLatest } from "redux-saga/effects";
import axiosInstance from "../../../axios/axiosInstance";
import { FORGOT_PASSWORD, FORGOT_PASSWORD_SUCCESS, FORGOT_PASSWORD_FAIL, LOGIN, LOGIN_SUCCESS, LOGIN_FAIL, CHECK_AUTH_STATUS, SIGNUP, SIGNUP_SUCCESS, SIGNUP_FAIL, OTP_VERIFICATION, OTP_VERIFICATION_SUCCESS, OTP_VERIFICATION_FAIL, RESEND_OTP, CHECK_RESET_PASSWORD_TOKEN_VALIDATION, RESET_PASSWORD, LOGOUT, GET_USER_DETAILS, GET_USER_DETAILS_SUCCESS, GET_USER_DETAILS_FAIL, UPDATE_USER_DETAILS, GET_USER_DETAILS_LOADING, UPDATE_PASSWORD_FAIL, UPDATE_PASSWORD_SUCCESS, UPDATE_PASSWORD, GET_USER_ADDRESS_LOADING, GET_USER_ADDRESS_SUCCESS, GET_USER_ADDRESS_FAIL, GET_USER_ADDRESS, UPDATE_USER_ADDRESS, DELETE_ACCOUNT} from "../../constant";
import { notify } from "../../../utils/notification";
import {logOut} from '../../../utils/helpers/logout'
import apiEndpoints from "../../../axios/api";


export const forgotPasswordReq = async({data})=>{   
    let BODY = {
        email: data.email
    }

    return axiosInstance.post(apiEndpoints.FORGOT_PASSWORD_API, {data: BODY})
        .then(response => {
            return response;
        }).catch((errors) => {
            console.log("errors", errors);

            if (errors.response?.data.statusCode === 401)
                logOut()
            else if (errors.response?.data.statusCode === 409)
                notify('warning', errors?.response?.data?.error);
            else if ( errors.response?.status === 400 || errors.response?.status=== 404)
                notify('error', errors?.response?.data?.error);
            else
                notify('error', "Something went wrong");
            
            return errors
        })
}

function* forgotPassword({data}){
    try{
        let result = yield call(forgotPasswordReq, {data})
        if(result.statusCode === 200){
            yield put({ type: FORGOT_PASSWORD_SUCCESS, payload: result});  
            notify('success', result.message);
        } else{
            yield put({ type: FORGOT_PASSWORD_FAIL, message: result?.response?.data?.error});
        }
    }catch(error){
        yield put({ type: FORGOT_PASSWORD_FAIL, message: error.message });
    }
}


export const loginReq = async({data})=>{   
    let BODY = {
        email: data.email,
        password: data.password
    }

    return axiosInstance.post(apiEndpoints.LOGIN_API, {data: BODY})
        .then(response => {
            return response;
        }).catch((errors) => {
            console.log("errors", errors);

            if (errors.response?.data.statusCode === 401)
                logOut()
            else if (errors.response?.data.statusCode === 409)
                notify('warning', errors?.response?.data?.error);
            else if ( errors.response?.status === 400 || errors.response?.status=== 404)
                notify('error', errors?.response?.data?.error);
            else
                notify('error', "Something went wrong");
            
            return errors
        })
}

function* login({data}){
    try{
        let result = yield call(loginReq, {data})
        if(result.statusCode === 200){
            yield put({ type: LOGIN_SUCCESS, payload: result.data});  
            localStorage.setItem('isLoggedIn', true)
            notify('success', result.message);
        } else{
            localStorage.setItem('isLoggedIn', false)
            yield put({ type: LOGIN_FAIL, message: result?.response?.data?.error});
        }
    }catch(error){
        yield put({ type: LOGIN_FAIL, message: error.message });
    }
}


export const signUpReq = async({data})=>{   
    let BODY = {
        first_name: data.firstName,
        last_name: data.lastName,
        email: data.email,
        password: data.password,
        phone: '+91-' + data.phoneNo,
        role: 'user'
    }

    return axiosInstance.post(apiEndpoints.SIGNUP_API, {data: BODY})
        .then(response => {
            return response;
        }).catch((errors) => {
            console.log("errors", errors);
            if (errors.response?.data.statusCode === 401)
                logOut()
            else if (errors.response?.data.statusCode === 409)
                notify('warning', errors?.response?.data?.error);
            else if ( errors.response?.status === 400 || errors.response?.status=== 404)
                notify('error', errors?.response?.data?.error);
            else
                notify('error', "Something went wrong");
            
            return errors
        })
}

function* signUp({data}){
    try{
        let result = yield call(signUpReq, {data})
        if(result.statusCode === 200){
        
            yield put({ type: SIGNUP_SUCCESS, payload: result});  
            notify('success', result.message);
        } else{
            yield put({ type: SIGNUP_FAIL, message: result?.response?.data?.error});
        }
    }catch(error){
        yield put({ type: SIGNUP_FAIL, message: error.message });
    }
}


export const OTPVerificationReq = async({data})=>{   
    let BODY = {
        phone: data.phoneNo,
        otp: data.otp
    }

    return axiosInstance.post(apiEndpoints.VERIFY_OTP_API, {data: BODY})
        .then(response => {
            return response;
        }).catch((errors) => {
            console.log("errors", errors);
            if (errors.response?.data.statusCode === 401)
                logOut()
            else if (errors.response?.data.statusCode === 409)
                notify('warning', errors?.response?.data?.error);
            else if ( errors.response?.status === 400 || errors.response?.status=== 404)
                notify('error', errors?.response?.data?.error);
            else
                notify('error', "Something went wrong");
            
            return errors
        })
}

function* OTPVerification({data}){
    try{
        let result = yield call(OTPVerificationReq, {data})
        if(result.statusCode === 200){
        
            yield put({ type: OTP_VERIFICATION_SUCCESS, payload: result});  
            notify('success', result.message);
            window.location.href = '/'
        } else{
            yield put({ type: OTP_VERIFICATION_FAIL, message: result?.response?.data?.error});
        }
    }catch(error){
        yield put({ type: OTP_VERIFICATION_FAIL, message: error.message });
    }
}


export const resendOTPReq = async({data})=>{   
    let BODY = {
        phone: data.phoneNo,
    }

    return axiosInstance.post(apiEndpoints.RESEND_OTP_API, {data: BODY})
        .then(response => {
            return response;
        }).catch((errors) => {
            console.log("errors", errors);

            if (errors.response?.data.statusCode === 401)
                logOut()
            else if (errors.response?.data.statusCode === 409)
                notify('warning', errors?.response?.data?.error);
            else if ( errors.response?.status === 400 || errors.response?.status=== 404)
                notify('error', errors?.response?.data?.error);
            else
                notify('error', "Something went wrong");
            
            return errors
        })
}

function* resendOTP({data}){
    try{
        let result = yield call(resendOTPReq, {data})
        if(result.statusCode === 200){
            notify('success', result.message);
        }
    }catch(error){
    }
}


export const checkAuthStatusReq = async()=>{   
    return axiosInstance.get(apiEndpoints.CHECK_AUTH_STATUS_API)
        .then(response => {
            return response;
        }).catch((errors) => {
            console.log("errors", errors);
            return errors
        })
}

function* checkAuthStatus({data}){
    try{
        let result = yield call(checkAuthStatusReq)
        if(result.statusCode === 200){
            yield put({ type: LOGIN_SUCCESS, payload: result.data});  
            localStorage.setItem('isLoggedIn', true)
        } else{
            yield put({ type: LOGIN_FAIL, message: result?.response?.data?.error});
            localStorage.setItem('isLoggedIn', false)
        }
    }catch(error){
        yield put({ type: LOGIN_FAIL, message: error.message });
    }
}


export const checkResetPasswordTokenReq = async({data})=>{   
    return axiosInstance.get(`${apiEndpoints.CHECK_RESET_PASSWORD_API}/${data.token}`)
        .then(response => {
            return response;
        }).catch((errors) => {
            console.log("errors", errors);

            // if (errors.response?.data.statusCode === 401 || errors.response?.status === 400 || errors.response?.status=== 404)
            //     notify('error', errors?.response?.data?.error);
            // else
            notify('error', "Something went wrong");
            return errors
        })
}

function* checkResetPasswordToken({data}){
    try{
        let result = yield call(checkResetPasswordTokenReq, {data})
        console.log(result)
        if(result.statusCode === 200){
            yield put({ type: LOGIN_SUCCESS, payload: result});  
            if(!result.data.valid)
                window.location.href = '/forgot-password'
        } else{
            window.history.back()
        }
    }catch(error){
    }
}


export const resetPasswordReq = async({data})=>{   
    let BODY = {
        password: data.password,
        confirmPassword: data.password,
    }

    return axiosInstance.put(`${apiEndpoints.RESET_PASSWORD_API}/${data.token}`, {data: BODY})
        .then(response => {
            return response;
        }).catch((errors) => {
            console.log("errors", errors);
            if (errors.response?.data.statusCode === 401)
                logOut()
            else if (errors.response?.data.statusCode === 409)
                notify('warning', errors?.response?.data?.error);
            else if ( errors.response?.status === 400 || errors.response?.status=== 404)
                notify('error', errors?.response?.data?.error);
            else
                notify('error', "Something went wrong");
            
            return errors
        })
}

function* resetPassword({data}){
    try{
        let result = yield call(resetPasswordReq, {data})
        if(result.statusCode === 200){
            notify('success', result.message);
            window.location.href = '/login'
        }
    }catch(error){
    }
}


export const logoutReq = async()=>{   
    return axiosInstance.get(apiEndpoints.LOGOUT_API)
        .then(response => {
            return response;
        }).catch((errors) => {
            console.log("errors", errors);
            if (errors.response?.data.statusCode === 401)
                logOut()
            else if (errors.response?.data.statusCode === 409)
                notify('warning', errors?.response?.data?.error);
            else if ( errors.response?.status === 400 || errors.response?.status=== 404)
                notify('error', errors?.response?.data?.error);
            else
                notify('error', "Something went wrong");
            
            return errors
        })
}

function* logout({data}){
    try{
        let result = yield call(logoutReq)
        if(result.statusCode === 200){
            window.location.href = '/'
            notify('success', result.message);
        }
    }catch(error){
    }
}


export const getUserDetailsReq = async()=>{   

    return axiosInstance.get(apiEndpoints.GET_USER_DETAILS)
        .then(response => {
            return response;
        }).catch((errors) => {
            console.log("errors", errors);
            if (errors.response?.data.statusCode === 401)
                logOut()
            else if (errors.response?.data.statusCode === 409)
                notify('warning', errors?.response?.data?.error);
            else if ( errors.response?.status === 400 || errors.response?.status=== 404)
                notify('error', errors?.response?.data?.error);
            else
                notify('error', "Something went wrong");
            
            return errors
        })
}

function* getUserDetails({data}){
    yield put({ type: GET_USER_DETAILS_LOADING});  

    try{
        let result = yield call(getUserDetailsReq, {data})
        if(result.statusCode === 200){
        
            yield put({ type: GET_USER_DETAILS_SUCCESS, payload: result.data});  
        } else{
            yield put({ type: GET_USER_DETAILS_FAIL, message: result?.response?.data?.error});
        }
    }catch(error){
        yield put({ type: GET_USER_DETAILS_FAIL, message: error.message });
    }
}


export const updateUserDetailsReq = async({data})=>{   

    var bodyFormData = new FormData();
    bodyFormData.append('first_name', data.firstName);
    bodyFormData.append('last_name', data.lastName);
    bodyFormData.append('email', data.email);
    bodyFormData.append('phone', data.phoneNo);
    bodyFormData.append('profile_pic', data.profile_pic);


    return axiosInstance.put(apiEndpoints.UPDATE_USER_DETAILS_API, bodyFormData)
        .then(response => {
            return response;
        }).catch((errors) => {
            console.log("errors", errors);
            if (errors.response?.data.statusCode === 401)
                logOut()
            else if (errors.response?.data.statusCode === 409)
                notify('warning', errors?.response?.data?.error);
            else if ( errors.response?.status === 400 || errors.response?.status=== 404)
                notify('error', errors?.response?.data?.error);
            else
                notify('error', "Something went wrong");
            
            return errors
        })
}

function* updateUserDetails({data}){
    yield put({ type: GET_USER_DETAILS_LOADING});  

    try{
        let result = yield call(updateUserDetailsReq, {data})
        if(result.statusCode === 200){
            let userData = yield call(checkAuthStatusReq)
            if(userData.statusCode === 200){
                yield put({ type: LOGIN_SUCCESS, payload: userData.data});  
            }
            notify('success', result.message);
            yield put({ type: GET_USER_DETAILS_SUCCESS, payload: result.data});  
        } else{
            yield put({ type: GET_USER_DETAILS_FAIL, message: result?.response?.data?.error});
        }

    }catch(error){
        yield put({ type: GET_USER_DETAILS_FAIL, message: error.message });
    }
}


export const getUserAddressReq = async()=>{   

    return axiosInstance.get(apiEndpoints.GET_USER_ADDRESS_DETAILS_API)
        .then(response => {
            return response;
        }).catch((errors) => {
            console.log("errors", errors);
            if (errors.response?.data.statusCode === 401)
                logOut()
            else if (errors.response?.data.statusCode === 409)
                notify('warning', errors?.response?.data?.error);
            else if ( errors.response?.status === 400 || errors.response?.status=== 404)
                notify('error', errors?.response?.data?.error);
            else
                notify('error', "Something went wrong");
            
            return errors
        })
}

function* getUserAddress({data}){
    yield put({ type: GET_USER_ADDRESS_LOADING});  

    try{
        let result = yield call(getUserAddressReq, {data})
        if(result.statusCode === 200){
        
            yield put({ type: GET_USER_ADDRESS_SUCCESS, payload: result.data});  
        } else{
            yield put({ type: GET_USER_ADDRESS_FAIL, message: result?.response?.data?.error});
        }
    }catch(error){
        yield put({ type: GET_USER_ADDRESS_FAIL, message: error.message });
    }
}


export const updateUserAddressReq = async({data})=>{   

    const BODY={
        country: data.country,
        city: data.city,
        state: data.state,
        address: data.address,
        pinCode: data.pinCode,
        locality: data.locality
    }

    return axiosInstance.put(apiEndpoints.UPDATE_USER_ADDRESS_DETAILS_API, {data: BODY})
        .then(response => {
            return response;
        }).catch((errors) => {
            console.log("errors", errors);
            if (errors.response?.data.statusCode === 401)
                logOut()
            else if (errors.response?.data.statusCode === 409)
                notify('warning', errors?.response?.data?.error);
            else if ( errors.response?.status === 400 || errors.response?.status=== 404)
                notify('error', errors?.response?.data?.error);
            else
                notify('error', "Something went wrong");
            
            return errors
        })
}

function* updateUserAddress({data}){
    yield put({ type: GET_USER_ADDRESS_LOADING});  

    try{
        let result = yield call(updateUserAddressReq, {data})
        if(result.statusCode === 200){
            notify('success', result.message);
            data?.onSuccessCallback?.()
            yield put({ type: GET_USER_ADDRESS_SUCCESS, payload: result.data});  
        } else{
            yield put({ type: GET_USER_ADDRESS_FAIL, message: result?.response?.data?.error});
        }

    }catch(error){
        yield put({ type: GET_USER_ADDRESS_FAIL, message: error.message });
    }
}


export const updatePasswordReq = async({data})=>{   

    const BODY={
        oldPassword: data.oldPassword,
        newPassword: data.newPassword,
        confirmPassword: data.confirmPassword
    }

    return axiosInstance.put(apiEndpoints.UPDATE_PASSWORD_API, {data: BODY})
        .then(response => {
            return response;
        }).catch((errors) => {
            console.log("errors", errors);
            if (errors.response?.data.statusCode === 401)
                logOut()
            else if (errors.response?.data.statusCode === 409)
                notify('warning', errors?.response?.data?.error);
            else if ( errors.response?.status === 400 || errors.response?.status=== 404)
                notify('error', errors?.response?.data?.error);
            else
                notify('error', "Something went wrong");
            
            return errors
        })
}

function* updatePassword({data}){
    try{
        let result = yield call(updatePasswordReq, {data})
        if(result.statusCode === 200){
            notify('success', result.message);
            yield put({ type: UPDATE_PASSWORD_SUCCESS});  
        } else{
            yield put({ type: UPDATE_PASSWORD_FAIL, message: result?.response?.data?.error});
        }

    }catch(error){
        yield put({ type: UPDATE_PASSWORD_FAIL, message: error.message });
    }
}


export const deleteAccountReq = async()=>{   

    return axiosInstance.delete(apiEndpoints.DELETE_ACCOUNT_API)
        .then(response => {
            return response;
        }).catch((errors) => {
            console.log("errors", errors);
            if (errors.response?.data.statusCode === 401)
                logOut()
            else if (errors.response?.data.statusCode === 409)
                notify('warning', errors?.response?.data?.error);
            else if ( errors.response?.status === 400 || errors.response?.status=== 404)
                notify('error', errors?.response?.data?.error);
            else
                notify('error', "Something went wrong");
            
            return errors
        })
}

function* deleteAccount({data}){
    try{
        let result = yield call(deleteAccountReq, {data})
        if(result.statusCode === 200){
            window.location.href ='/'
        }
    }catch(error){
    }
}


function* authSaga(){
    yield takeLatest(FORGOT_PASSWORD, forgotPassword)
    yield takeLatest(LOGIN, login)
    yield takeLatest(LOGOUT, logout)
    yield takeLatest(SIGNUP, signUp)
    yield takeLatest(CHECK_AUTH_STATUS, checkAuthStatus)
    yield takeLatest(OTP_VERIFICATION, OTPVerification)
    yield takeLatest(RESEND_OTP, resendOTP)
    yield takeLatest(CHECK_RESET_PASSWORD_TOKEN_VALIDATION, checkResetPasswordToken)
    yield takeLatest(RESET_PASSWORD, resetPassword)
    yield takeLatest(GET_USER_DETAILS, getUserDetails)
    yield takeLatest(UPDATE_USER_DETAILS, updateUserDetails)
    yield takeLatest(GET_USER_ADDRESS, getUserAddress)
    yield takeLatest(UPDATE_USER_ADDRESS, updateUserAddress)
    yield takeLatest(UPDATE_PASSWORD, updatePassword)
    yield takeLatest(DELETE_ACCOUNT, deleteAccount)
}

export default authSaga;