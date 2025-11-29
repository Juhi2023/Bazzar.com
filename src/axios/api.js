const apiEndpoints = {
    //auth API
    FORGOT_PASSWORD_API: '/api/v1/password/forgot',
    LOGIN_API: '/api/v1/login',
    SIGNUP_API: '/api/v1/register',
    VERIFY_OTP_API: '/api/v1/verifyOTP',
    RESEND_OTP_API: '/api/v1/resendOTP',
    CHECK_AUTH_STATUS_API: '/api/v1/auth-status',
    CHECK_RESET_PASSWORD_API: '/api/v1/validate-reset-password-token',
    RESET_PASSWORD_API: '/api/v1/password/reset',
    LOGOUT_API: '/api/v1/logout',
    GET_USER_DETAILS: '/api/v1/me',
    UPDATE_USER_DETAILS_API: '/api/v1/me/update',
    GET_USER_ADDRESS_DETAILS_API: '/api/v1/user-address',
    UPDATE_USER_ADDRESS_DETAILS_API: '/api/v1/address/update',
    UPDATE_PASSWORD_API: '/api/v1/password/update',
    DELETE_ACCOUNT_API: '/api/v1/me',

    //cart API
    GET_CART_ITEMS_API: '/api/v1/cart',
    ADD_ITEM_TO_CART_API: '/api/v1/cart',
    DELETE_ITEM_FROM_CART_API: '/api/v1/cart',

    //category API
    GET_CATEGORY_LIST_API: '/api/v1/categories',

    //product API
    GET_PRODUCT_LIST_API: '/api/v1/productS',
    GET_PRODUCT_DETAILS_API: '/api/v1/product',

    //order API
    CREATE_ORDER_API: '/api/v1/order/new',
    GET_MY_ORDER_API: '/api/v1/order/me',
    GET_ORDER_DETAILS_API: '/api/v1/order',
    GET_ALL_ORDERS_API: '/api/v1/admin/orders',
    UPDATE_ORDER_API: '/api/v1/admin/order',
    DELETE_ORDER_API: '/api/v1/admin/order',
    CANCEL_ORDER_API: '/api/v1/admin/orders/cancel',


    //rating API
    UPDATE_REVIEW_API: '/api/v1/review',
    DELETE_REVIEW_API: '/api/v1/review',

    //Admin Routes
    GET_DASHBOARD_DATA_API: '/api/v1/admin/dashboard',

}

export default apiEndpoints;