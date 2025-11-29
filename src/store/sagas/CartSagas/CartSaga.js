import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import axiosInstance from "../../../axios/axiosInstance";
import { GET_CART_ITEMS_LIST_SUCCESS, GET_CART_ITEMS_LIST_FAIL, GET_CART_ITEMS_LIST, ADD_ITEM_TO_CART, ADD_ITEM_TO_CART_SUCCESS, ADD_ITEM_TO_CART_FAIL, DELETE_ITEM_FROM_CART_SUCCESS, DELETE_ITEM_FROM_CART_FAIL, DELETE_ITEM_FROM_CART, INCREASE_CART_COUNT, DECREASE_CART_COUNT } from "../../constant";
import { notify } from "../../../utils/notification";
import {logOut} from '../../../utils/helpers/logout'
import apiEndpoints from "../../../axios/api";


export const getCartItemsListReq = async()=>{   
    return axiosInstance.get(apiEndpoints.GET_CART_ITEMS_API)
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

function* getCartItemsList(){
    try{
        let result = yield call(getCartItemsListReq)
        if(result.statusCode === 200){
            yield put({ type: GET_CART_ITEMS_LIST_SUCCESS, payload: result});  
        } else{
            yield put({ type: GET_CART_ITEMS_LIST_FAIL, message: result?.response?.data?.error});
        }
    }catch(error){
        yield put({ type: GET_CART_ITEMS_LIST_FAIL, message: error.message });
    }
}


export const addItemToCartListReq = async({data})=>{   
    const BODY = {
        productId: data.productId,
        quantity: data.quantity
    }
    return axiosInstance.put(apiEndpoints.ADD_ITEM_TO_CART_API, {data:BODY})
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

function* addItemToCartList({data}){
    try{
        let result = yield call(addItemToCartListReq, {data})
        if(result.statusCode === 200){
            if(data.productName){
                notify('success', `You have changed ${data.productName} quantity to '${data.quantity}'`)
                yield put({ type: ADD_ITEM_TO_CART_SUCCESS, payload: data})
            }
            else{
                notify('success', result.message)
                yield put({ type: INCREASE_CART_COUNT});
                yield put({ type: ADD_ITEM_TO_CART_SUCCESS})
            }
        }
        yield put({ type: ADD_ITEM_TO_CART_FAIL});
    }catch(error){
    }
}


export const deleteItemFromCartListReq = async({data})=>{   
    const BODY = {
        productId: data.productId,
    }

    return axiosInstance.delete(apiEndpoints.DELETE_ITEM_FROM_CART_API, {data: {data:BODY}})
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

function* deleteItemFromCartList({data}){
    try{
        let result = yield call(deleteItemFromCartListReq, {data})
        if(result.statusCode === 200){
            notify('success', result.message)
            yield put({ type: DELETE_ITEM_FROM_CART_SUCCESS, payload: {...data}});
            yield put({ type: DECREASE_CART_COUNT});
        }
        yield put({ type: DELETE_ITEM_FROM_CART_FAIL});
    }catch(error){
    }
}

function* cartSaga(){
    yield takeEvery(GET_CART_ITEMS_LIST, getCartItemsList)
    yield takeLatest(ADD_ITEM_TO_CART, addItemToCartList)
    yield takeEvery(DELETE_ITEM_FROM_CART, deleteItemFromCartList)
}

export default cartSaga;