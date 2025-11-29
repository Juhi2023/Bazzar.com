import * as type from '../../constant';


export function orderReducer(state = {
    loading: false,
    myOrders: [],
    orders: [],
    orderLoading: false,
    orderDetails: null,
    updateLoader: false,
    error:null
}, action) {

  switch (action.type) {
    case type.GET_MY_ORDERS:
      return {
        ...state,
        loading: true,
      }
    case type.GET_MY_ORDERS_SUCCESS:
      return {
        ...state,
        myOrders: action?.payload,
        error: null,
        loading: false,
      }

    case type.GET_MY_ORDERS_FAIL:
      return {
        ...state,
        loading: false,
        myOrders: [],
        error: action?.error?.data?.message,
      }

    case type.GET_ORDER_DETAILS:
      return {
        ...state,
        orderLoading: true,
      }
    case type.GET_ORDER_DETAILS_SUCCESS:
      return {
        ...state,
        orderDetails: action?.payload,
        error: null,
        orderLoading: false,
      }

    case type.GET_ORDER_DETAILS_FAIL:
      return {
        ...state,
        orderLoading: false,
        orderDetails: [],
        error: action?.error?.data?.message,
      }

      case type.CANCEL_ORDER:
        return {
          ...state,
          updateLoader: true,
        }
      case type.CANCEL_ORDER_SUCCESS:
        return {
          ...state,
          updateLoader: false,
          myOrders: state.myOrders.map(order =>
            order._id === action.payload.id ? { ...order, orderStatus: "Cancelled" } : order
          )
        }
  
      case type.CANCEL_ORDER_FAIL:
        return {
          ...state,
          updateLoader: false,
        }

    default:
      return state
  }
}
