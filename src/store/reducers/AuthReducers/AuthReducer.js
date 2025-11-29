import * as type from '../../constant';

export function forgotPasswordReducer(state = {
    loading: false,
    error:null
}, action) {

  switch (action.type) {
    case type.FORGOT_PASSWORD:
      return {
        ...state,
        loading: true,
      }
    case type.FORGOT_PASSWORD_SUCCESS:
      return {
        ...state,
        error: null,
        loading: false,
      }

    case type.FORGOT_PASSWORD_FAIL:
      return {
        ...state,
        error: action?.error?.data?.message,
        loading: false,
      }
    default:
      return state
  }
}

//FOR LOGIN AND LOGOUT
export function loginReducer(state = {
    loadingauthcheck: true,
    loading: false,
    isLoggedIn: false,
    userData:null,
    error:null
}, action) {

  switch (action.type) {
    case type.LOGIN:
      return {
        ...state,
        loading: true,
      }
    case type.LOGIN_SUCCESS:
      return {
        ...state,
        error: null,
        isLoggedIn: true,
        userData: action.payload,
        loading: false,
        loadingauthcheck: false,
      }

    case type.INCREASE_CART_COUNT:
      return{
        ...state,
        userData: {
          ...state.userData,
          cartItemsCount: state.userData.cartItemsCount + 1
        }
      }

    case type.DECREASE_CART_COUNT:
      return{
        ...state,
        userData: {
          ...state.userData,
          cartItemsCount: state.userData.cartItemsCount - 1
        }
      }

    case type.CLEAR_CART_COUNT:
      return{
        ...state,
        userData: {
          ...state.userData,
          cartItemsCount: 0
        }
      }

    case type.LOGIN_FAIL:
      return {
        ...state,
        error: action?.error?.data?.message,
        loading: false,
        loadingauthcheck: false,
        isLoggedIn: false
      }
    
    case type.LOGOUT:
      return {
        ...state,
        loading: true,
      }
    case type.LOGOUT_SUCCESS:
      return {
        ...state,
        error: null,
        isLoggedIn: false,
        loading: false,
      }

    case type.LOGOUT_FAIL:
      return {
        ...state,
        error: action?.error?.data?.message,
        loading: false,
      }
    default:
      return state
  }
}

export function signUpReducer(state = {
  loading: false,
  otpSent: false,
  error:null
}, action) {

switch (action.type) {
  case type.SIGNUP:
    return {
      ...state,
      loading: true,
      otpSent: false,
    }
    
  case type.SIGNUP_SUCCESS:
    return {
      ...state,
      error: null,
      otpSent: true,
      loading: false,
    }

  case type.REMOVE_SIGNUP_DATA:
    return {
      ...state,
      error: null,
      otpSent: false,
      loading: false,
    }

  case type.SIGNUP_FAIL:
    return {
      ...state,
      error: action?.error?.data?.message,
      loading: false,
    }
  default:
    return state
}
}

export function verificationReducer(state = {
  loading: false,
  error:null
}, action) {

switch (action.type) {
  case type.OTP_VERIFICATION:
    return {
      ...state,
      loading: true,
    }
  case type.OTP_VERIFICATION_SUCCESS:
    return {
      ...state,
      error: null,
      loading: false,
    }

  case type.OTP_VERIFICATION_FAIL:
    return {
      ...state,
      error: action?.error?.data?.message,
      loading: false,
    }
  default:
    return state
}
}

export function userDetailsReducer(state = {
  loading: false,
  userDetails: null,
  error:null
}, action) {

switch (action.type) {
  case type.GET_USER_DETAILS_LOADING:
    return {
      ...state,
      loading: true,
      error:null
    }
    
  case type.GET_USER_DETAILS_SUCCESS:
    return {
      ...state,
      error: null,
      userDetails: action.payload,
      loading: false,
    }

  case type.GET_USER_DETAILS_FAIL:
    return {
      ...state,
      error: action?.message,
      loading: false,
    }
  default:
    return state
}
}

export function updatePasswordReducer(state = {
  loading: false,
  error:null
}, action) {

switch (action.type) {
  case type.GET_USER_DETAILS_LOADING:
    return {
      ...state,
      loading: true,
      error:null
    }
    
  case type.GET_USER_DETAILS_SUCCESS:
    return {
      ...state,
      error: null,
      loading: false,
    }

  case type.GET_USER_DETAILS_FAIL:
    return {
      ...state,
      error: action?.message,
      loading: false,
    }
  default:
    return state
}
}

export function userAddressReducer(state = {
  loading: false,
  userAddress: null,
  error:null
}, action) {

switch (action.type) {
  case type.GET_USER_ADDRESS_LOADING:
    return {
      ...state,
      loading: true,
      error:null
    }
    
  case type.GET_USER_ADDRESS_SUCCESS:
    return {
      ...state,
      error: null,
      userAddress: action.payload,
      loading: false,
    }

  case type.GET_USER_ADDRESS_FAIL:
    return {
      ...state,
      error: action?.message,
      loading: false,
    }
  default:
    return state
}
}