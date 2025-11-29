import { call, put, takeLatest } from "redux-saga/effects";
import axiosInstance from "../../../axios/axiosInstance";
import { CANCEL_ORDER, CANCEL_ORDER_FAIL, CANCEL_ORDER_SUCCESS, CLEAR_CART_COUNT, CREATE_ORDER, CREATE_ORDER_FAIL, CREATE_ORDER_SUCCESS, GET_MY_ORDERS, GET_MY_ORDERS_FAIL, GET_MY_ORDERS_SUCCESS, GET_ORDER_DETAILS, GET_ORDER_DETAILS_FAIL, GET_ORDER_DETAILS_SUCCESS} from "../../constant";
import { notify } from "../../../utils/notification";
import {logOut} from '../../../utils/helpers/logout'
import apiEndpoints from "../../../axios/api";


export const createOrderReq = async({data})=>{   
    let BODY = {
        shippingInfo: data.shippingInfo,
        orderItems: data.orderItems,
        itemsPrice: data.itemsPrice,
        taxPrice: data.taxPrice,
        shippingPrice: data.shippingPrice,
        totalPrice: data.totalPrice ,
        paymentInfo: data.paymentInfo
    }

    return axiosInstance.post(apiEndpoints.CREATE_ORDER_API, {data: BODY})
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

function* createOrder({data}){
    try{
        let result = yield call(createOrderReq, {data})
        if(result.statusCode === 200){
            yield put({ type: CREATE_ORDER_SUCCESS, payload: result});  
            notify('success', result.message);
            data?.onSuccessCallback?.()
            yield put({ type: CLEAR_CART_COUNT});

        } else{
            yield put({ type: CREATE_ORDER_FAIL, message: result?.response?.data?.error});
        }
    }catch(error){
        yield put({ type: CREATE_ORDER_FAIL, message: error.message });
    }
}

export const getMyOrdersReq = async()=>{   
    return axiosInstance.get(apiEndpoints.GET_MY_ORDER_API)
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

function* getMyOrders(){
    try{
        
        let result = yield call(getMyOrdersReq)
        if(result.statusCode === 200){
            yield put({ type: GET_MY_ORDERS_SUCCESS, payload: result.data});  
        } else{
            yield put({ type: GET_MY_ORDERS_FAIL, message: result?.response?.data?.error});
        }
    }catch(error){
        yield put({ type: GET_MY_ORDERS_FAIL, message: error.message });
    }
}

export const getOrderDetailsReq = async({data})=>{   
    return axiosInstance.get(`${apiEndpoints.GET_ORDER_DETAILS_API}/${data.id}`)
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

function* getOrderDetails({data}){
    try{
        
        let result = yield call(getOrderDetailsReq, {data})
        if(result.statusCode === 200){
            yield put({ type: GET_ORDER_DETAILS_SUCCESS, payload: result.data});  
        } else{
            yield put({ type: GET_ORDER_DETAILS_FAIL, message: result?.response?.data?.error});
        }
    }catch(error){
        yield put({ type: GET_ORDER_DETAILS_FAIL, message: error.message });
    }
}


export const cancelOrderReq = async({data})=>{   
    return axiosInstance.put(`${apiEndpoints.CANCEL_ORDER_API}/${data.id}`)
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

function* cancelOrder({data}){
    try{
        
        let result = yield call(cancelOrderReq, {data})
        if(result.statusCode === 200){
            data?.onSuccessCallback?.()
            yield put({ type: CANCEL_ORDER_SUCCESS, payload: data});  
        } else{
            yield put({ type: CANCEL_ORDER_FAIL, message: result?.response?.data?.error});
        }
    }catch(error){
        yield put({ type: CANCEL_ORDER_FAIL, message: error.message });
    }
}



function* orderSaga(){
    yield takeLatest(CREATE_ORDER, createOrder)
    yield takeLatest(GET_MY_ORDERS, getMyOrders)
    yield takeLatest(GET_ORDER_DETAILS, getOrderDetails)
    yield takeLatest(CANCEL_ORDER, cancelOrder)
}

export default orderSaga;