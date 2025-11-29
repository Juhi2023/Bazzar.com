import { combineReducers } from 'redux'
import {
    forgotPasswordReducer,
    loginReducer,
    signUpReducer,
    verificationReducer,
    userDetailsReducer,
    updatePasswordReducer,
    userAddressReducer,
} from '../reducers/AuthReducers/AuthReducer'

import {
    productListReducer,
    productDetailsReducer
} from '../reducers/ProductReducers/ProductReducer'

import {
    categoryListReducer
} from '../reducers/CategoryReducers/CategoryReducer'

import {
    cartItemsListReducer
} from '../reducers/CartReducers/CartReducer'
import { orderReducer } from './OrderReducers/OrderReducers'
import { dashboardReducer } from './AdminReducers/AdminReducer'

const rootReducer = combineReducers ({
    forgotPasswordReducer ,
    loginReducer,
    signUpReducer,
    verificationReducer,
    userDetailsReducer,
    updatePasswordReducer,
    userAddressReducer,
    productListReducer,
    productDetailsReducer,
    categoryListReducer,
    cartItemsListReducer,
    orderReducer,
    dashboardReducer
})

export default rootReducer;