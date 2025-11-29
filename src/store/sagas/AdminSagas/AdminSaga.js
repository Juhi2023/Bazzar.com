import { call, put, takeLatest } from "redux-saga/effects";
import axiosInstance from "../../../axios/axiosInstance";
import { notify } from "../../../utils/notification";
import {logOut} from '../../../utils/helpers/logout'
import apiEndpoints from "../../../axios/api";
import { GET_DASHBOARD_DATA, GET_DASHBOARD_DATA_FAIL, GET_DASHBOARD_DATA_SUCCESS } from "../../constant";


export const getDashboardDataReq = async()=>{   
    return axiosInstance.get(apiEndpoints.GET_DASHBOARD_DATA_API)
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

function* getDashboardData(){
    try{
        
        let result = yield call(getDashboardDataReq)
        if(result.statusCode === 200){
            yield put({ type: GET_DASHBOARD_DATA_SUCCESS, payload: result.data});  
        } else{
            yield put({ type: GET_DASHBOARD_DATA_FAIL, message: result?.response?.data?.error});
        }
    }catch(error){
        yield put({ type: GET_DASHBOARD_DATA_FAIL, message: error.message });
    }
}



function* adminSaga(){
    yield takeLatest(GET_DASHBOARD_DATA, getDashboardData)
}

export default adminSaga;