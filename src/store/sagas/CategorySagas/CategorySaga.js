import { call, put, takeEvery } from "redux-saga/effects";
import axiosInstance from "../../../axios/axiosInstance";
import { GET_CATEGORY_LIST_SUCCESS, GET_CATEGORY_LIST_FAIL, GET_CATEGORY_LIST } from "../../constant";
import { notify } from "../../../utils/notification";
import {logOut} from '../../../utils/helpers/logout'
import apiEndpoints from "../../../axios/api";

export const getCategoryListReq = async()=>{   
    return axiosInstance.get(apiEndpoints.GET_CATEGORY_LIST_API)
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
                //notify('error', "Something went wrong");
            
            return errors
        })
}

function* getCategoryList(){
    try{
        let result = yield call(getCategoryListReq)
        if(result.statusCode === 200){
            yield put({ type: GET_CATEGORY_LIST_SUCCESS, payload: result});  
        } else{
            yield put({ type: GET_CATEGORY_LIST_FAIL, message: result?.response?.data?.error});
        }
    }catch(error){
        yield put({ type: GET_CATEGORY_LIST_FAIL, message: error.message });
    }
}

function* categorySaga(){
    yield takeEvery(GET_CATEGORY_LIST, getCategoryList)
}

export default categorySaga;