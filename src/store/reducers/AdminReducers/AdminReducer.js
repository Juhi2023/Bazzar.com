import * as type from '../../constant';


export function dashboardReducer(state = {
    loading: false,
    data: null,
    error:null
}, action) {

  switch (action.type) {
    case type.GET_DASHBOARD_DATA:
      return {
        ...state,
        loading: true,
      }
    case type.GET_DASHBOARD_DATA_SUCCESS:
      return {
        ...state,
        data: action?.payload,
        error: null,
        loading: false,
      }

    case type.GET_DASHBOARD_DATA_FAIL:
      return {
        ...state,
        loading: false,
        data: null,
        error: action?.error?.data?.message,
      }
    
  
    default:
      return state
  }
}

