import * as type from '../../constant';


export function productListReducer(state = {
    loading: false,
    products: [],
    productsCount: null,
    resultPerPage: null,
    filteredProductsCount: null,
    error:null
}, action) {

  switch (action.type) {
    case type.GET_PRODUCT_LIST:
      return {
        ...state,
        loading: true,
      }
    case type.GET_PRODUCT_LIST_SUCCESS:
      return {
        ...state,
        products: action?.payload?.data.products,
        productsCount: action?.payload?.data.productsCount,
        resultPerPage: action?.payload?.data.resultPerPage,
        filteredProductsCount: action?.payload?.data.filteredProductsCount,
        error: null,
        loading: false,
      }

    case type.GET_PRODUCT_LIST_FAIL:
      return {
        ...state,
        loading: false,
        products: [],
        error: action?.error?.data?.message,
      }
    default:
      return state
  }
}

export function productDetailsReducer(state = {
    loading: false,
    productDetail: null,
    error:null,
    updateReviewLoader: false
}, action) {

  switch (action.type) {
    case type.GET_PRODUCT_DETAILS:
      return {
        ...state,
        loading: true,
      }
    case type.GET_PRODUCT_DETAILS_SUCCESS:
      return {
        ...state,
        productDetail: action?.payload?.data,
        error: null,
        loading: false,
      }

    case type.GET_PRODUCT_DETAILS_FAIL:
      return {
        ...state,
        productDetail: null,
        error: action?.error?.data?.message,
        loading: false,
      }
    
    case type.ADD_ITEM_TO_CART_SUCCESS:
      return {
        ...state,
        productDetail: {...state.productDetail , addedInCart: true, },
        error: null,
        loading: false,
      }

    case type.ADD_UPDATE_REVIEWS:
      return {
        ...state,
        updateReviewLoader: true,
      }
    case type.ADD_UPDATE_REVIEWS_SUCCESS:
      return {
        ...state,
        updateReviewLoader: false,
      }


    case type.DELETE_REVIEW_SUCCESS:
      return {
        ...state,
        productDetail: {
          ...state.productDetail,
          reviews: state.productDetail.reviews.filter(item=> !item.isUserReview)
        },
      }

    default:
      return state
  }
}