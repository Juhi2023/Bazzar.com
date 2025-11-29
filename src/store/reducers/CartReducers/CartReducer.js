import * as type from '../../constant';


export function cartItemsListReducer(state = {
    loading: false,
    cartItems: null,
    error:null
}, action) {

  switch (action.type) {
    case type.GET_CART_ITEMS_LIST:
      return {
        ...state,
        loading: true,
      }
    case type.GET_CART_ITEMS_LIST_SUCCESS:
      return {
        ...state,
        cartItems: action?.payload?.data?.cartItems,
        error: null,
        loading: false,
      }

    case type.GET_CART_ITEMS_LIST_FAIL:
      return {
        ...state,
        loading: false,
        cartItems: null,
        error: action?.error?.data?.message,
      }
    
    case type.ADD_ITEM_TO_CART || type.DELETE_ITEM_FROM_CART:
        return {
          ...state,
          loading: true,
        }
    case type.ADD_ITEM_TO_CART_SUCCESS: {
      let newList = state.cartItems.cartItems.map((item, index)=>{
        if(item.product._id === action?.payload?.productId){
          item.quantity =  action?.payload?.quantity
        }
        return item
      })
      return {
          ...state,
          loading: false,
          ...(action.payload && {cartItems: {cartItems: newList}})
      }
    }
    case type.ADD_ITEM_TO_CART_FAIL  || type.DELETE_ITEM_FROM_CART_FAIL:
        return {
            ...state,
            loading: false,
        }
    case  type.DELETE_ITEM_FROM_CART_SUCCESS :{
      let newList = state.cartItems?.cartItems?.filter((item)=>{return item?.product._id !== action.payload.productId})
      return {
          ...state,
          loading: false,
          cartItems: {cartItems: newList}
      }
    }
    default:
      return state
  }
}

