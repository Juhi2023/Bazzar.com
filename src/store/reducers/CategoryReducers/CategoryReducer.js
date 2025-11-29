import * as type from '../../constant';


export function categoryListReducer(state = {
    loading: false,
    categories: null,
    error:null
}, action) {

  switch (action.type) {
    case type.GET_CATEGORY_LIST:
      return {
        ...state,
        loading: true,
      }
    case type.GET_CATEGORY_LIST_SUCCESS:
      return {
        ...state,
        categories: action?.payload?.data.categories,
        error: null,
        loading: false,
      }

    case type.GET_CATEGORY_LIST_FAIL:
      return {
        ...state,
        loading: false,
        categories: null,
        error: action?.error?.data?.message,
      }
    default:
      return state
  }
}
