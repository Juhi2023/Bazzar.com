import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import axiosInstance from "../../../axios/axiosInstance";
import { GET_PRODUCT_LIST, GET_PRODUCT_LIST_SUCCESS, GET_PRODUCT_LIST_FAIL, GET_PRODUCT_DETAILS, GET_PRODUCT_DETAILS_SUCCESS, GET_PRODUCT_DETAILS_FAIL, ADD_UPDATE_REVIEWS_SUCCESS, ADD_UPDATE_REVIEWS_FAIL, ADD_UPDATE_REVIEWS, DELETE_REVIEW, DELETE_REVIEW_FAIL, DELETE_REVIEW_SUCCESS } from "../../constant";
import { notify } from "../../../utils/notification";
import {logOut} from '../../../utils/helpers/logout'
import apiEndpoints from "../../../axios/api";


export const getProductListReq = async({data})=>{   
    let {resultPerPage, keyword, page, minPrice, maxPrice, rating, sortBy, category} = data;
    let categoryString='';
    category?.forEach((item, index)=>{
        categoryString+=`&category=${item}`
        
    })
    return axiosInstance.get(`${apiEndpoints.GET_PRODUCT_LIST_API}?${resultPerPage ? `resultPerPage=${resultPerPage}` : ''}${keyword ? `&keyword=${keyword}` : ''}${page ? `&page=${page}` : ''}${minPrice && minPrice!=200 ? `&price[gte]=${minPrice}` : ''}${maxPrice && maxPrice!=10000 ? `&price[lte]=${maxPrice}` : ''}${rating && rating!=0 ? `&rating[gte]=${rating}` : ''}${sortBy ? `&sortBy=${sortBy}` : ''}${categoryString ? `${categoryString}` : ''}`)
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

function* getProductList({data}){
    try{
        let result = yield call(getProductListReq, {data})
        if(result.statusCode === 200){
            yield put({ type: GET_PRODUCT_LIST_SUCCESS, payload: result});  
        } else{
            yield put({ type: GET_PRODUCT_LIST_FAIL, message: result?.response?.data?.error});
        }
    }catch(error){
        yield put({ type: GET_PRODUCT_LIST_FAIL, message: error.message });
    }
}


export const getProductDetailsReq = async({data})=>{   
    return axiosInstance.get(`${apiEndpoints.GET_PRODUCT_DETAILS_API}/${data?.id}`)
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

function* getProductDetails({data}){
    try{
        let result = yield call(getProductDetailsReq, {data})

        if(result.statusCode === 200){
            yield put({ type: GET_PRODUCT_DETAILS_SUCCESS, payload: result});  
        }else{
            yield put({ type: GET_PRODUCT_DETAILS_FAIL, message: result?.response?.data?.error});
        }
    }catch(error){
        yield put({ type: GET_PRODUCT_DETAILS_FAIL, message: error.message });
    }
}

export const updateReviewReq = async({data})=>{   
    let BODY = {
        productId: data.productId,
        comment: data.comment,
        rating: data.rating,
    }

    return axiosInstance.post(apiEndpoints.UPDATE_REVIEW_API, {data: BODY})
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

function* updateReview({data}){
    try{
        let result = yield call(updateReviewReq, {data})
        if(result.statusCode === 200){
            yield put({ type: ADD_UPDATE_REVIEWS_SUCCESS, payload: data});  
            data?.onSuccessCallback?.()
            notify('success', 'Review Submitted successfully');
            let product = yield call(getProductDetailsReq, {data:{id:data.productId}})
            yield put({ type: GET_PRODUCT_DETAILS_SUCCESS, payload: product});  

        } else{
            yield put({ type: ADD_UPDATE_REVIEWS_FAIL, message: result?.response?.data?.error});
        }
    }catch(error){
        yield put({ type: ADD_UPDATE_REVIEWS_FAIL, message: error.message });
    }
}

export const deleteReviewReq = async({data})=>{   
    return axiosInstance.delete(`${apiEndpoints.DELETE_REVIEW_API}?productId=${data.productId}&reviewId=${data.reviewId}`)
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

function* deleteReview({data}){
    try{
        let result = yield call(deleteReviewReq, {data})
        if(result.statusCode === 200){
            yield put({ type: DELETE_REVIEW_SUCCESS, payload: data});  
            notify('success', 'Review deleted successfully');

        } else{
            yield put({ type: DELETE_REVIEW_FAIL, message: result?.response?.data?.error});
        }
    }catch(error){
        yield put({ type: DELETE_REVIEW_FAIL, message: error.message });
    }
}

function* productSaga(){
    yield takeLatest(GET_PRODUCT_LIST, getProductList)
    yield takeEvery(GET_PRODUCT_DETAILS, getProductDetails)
    yield takeEvery(ADD_UPDATE_REVIEWS, updateReview)
    yield takeLatest(DELETE_REVIEW, deleteReview)
}

export default productSaga;