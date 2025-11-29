exports.ERROR = {
    DEFAULT: {
        statusCode: 501,
        customMessage: 'Something went wrong',
        type: 'DEFAULT'
    },
    MOBILE_NUMBER_ALREADY_EXISTS : {
        statusCode: 409,
        customMessage: 'Mobile number already in use',
        type: 'MOBILE_NUMBER_ALREADY_EXISTS'
    },
    EMAIL_ALREADY_EXISTS : {
        statusCode: 409,
        customMessage: 'Email already in use',
        type: 'EMAIL_ALREADY_EXISTS'
    },
    USER_DATA_DOES_NOT_EXISTS_IN_DB : {
        statusCode: 409,
        customMessage: "User Data doesn't exist",
        type: 'USER_DATA_DOES_NOT_EXISTS_IN_DB'
    },
    INVALID_OTP : {
        statusCode: 409,
        customMessage: "Invalid OTP",
        type: 'INVALID_OTP'
    },
    ENTER_EMAIL_PASSWORD : {
        statusCode: 409,
        customMessage: 'Please enter valid email or password',
        type: 'ENTER_EMAIL_PASSWORD'
    },
    INVALID_EMAIL_OR_PASSWORD : {
        statusCode: 409,
        customMessage: 'Invalid email or password',
        type: 'INVALID_EMAIL_OR_PASSWORD'
    },
    NO_USER_FOUND : {
        statusCode: 404,
        customMessage: 'User not found',
        type: 'NO_USER_FOUND'
    },
    UNAUTHORIZED: {
        statusCode: 401,
        customMessage: 'Please Login to access this resource',
        type: 'UNAUTHORIZEDD'
    },
    TOKEN_INVALID : {
        statusCode: 401,
        customMessage: 'Invalid token or expired',
        type: 'TOKEN_INVALID'
    },
    PASSWORD_NOT_MATCH : {
        statusCode: 400,
        customMessage: "Password doesn't match",
        type: 'PASSWORD_NOT_MATCH'
    },
    INCORRECT_OLD_PASSWORD : {
        statusCode: 400,
        customMessage: "Old Password is incorrect",
        type: 'INCORRECT_OLD_PASSWORD'
    },
    PRODUCT_NOT_FOUND : {
        statusCode: 404,
        customMessage: 'Product not found',
        type: 'PRODUCT_NOT_FOUND'
    },
    ORDER_NOT_FOUND : {
        statusCode: 404,
        customMessage: 'Order not found',
        type: 'ORDER_NOT_FOUND'
    }, 
    CATEGORY_NOT_FOUND : {
        statusCode: 404,
        customMessage: 'Category not found',
        type: 'CATEGORY_NOT_FOUND'
    },
    CATEGORY_ALREADY_EXISTS : {
        statusCode: 409,
        customMessage: 'Category already exist.',
        type: 'CATEGORY_ALREADY_EXISTS'
    },
};

exports.SUCCESS = {
    DEFAULT: {
        statusCode: 200,
        customMessage: 'Success',
        type: 'DEFAULT'
    },
    OTP_SENT_SUCCESSFULLY: {
        statusCode: 200,
        customMessage: 'OTP sent successfully',
        type: 'OTP_SENT_SUCCESSFULLY'
    },
    REGISTER: {
        statusCode: 200,
        customMessage: 'Registered successfully',
        type: 'REGISTER'
    },
    LOGIN: {
        statusCode: 200,
        customMessage: 'Login successful',
        type: 'LOGIN'
    },
    USER_LOGOUT : {
        statusCode: 200,
        customMessage: 'Logged out successfully',
        type: 'USER_LOGOUT'
    },
    EMAIL_SENT: {
        statusCode: 200,
        customMessage: 'Email sent successfully',
        type: 'EMAIL_SENT'
    },
    PASSWORD_CHANGED: {
        statusCode: 200,
        customMessage: 'Password changed successfully',
        type: 'PASSWORD_CHANGED'
    },
    ADDRESS_CHANGED: {
        statusCode: 200,
        customMessage: 'Address changed successfully',
        type: 'ADDRESS_CHANGED'
    },
    RESET_PASSWORD_LINK_EXPIRED : {
        statusCode: 200,
        customMessage: 'It seems that you have already reset your password or the Reset password link has expired',
        type: 'RESET_PASSWORD_LINK_EXPIRED'
    },
    VAILD_TOKEN : {
        statusCode: 200,
        customMessage: 'Token is valid',
        type: 'VAILD_TOKEN'
    },
    FETCH_USER_PROFILE: {
        statusCode: 200,
        customMessage: 'Profile details fetched successfully',
        type: 'FETCH_USER_PROFILE'
    },
    PROFILE_UPDATE: {
        statusCode: 200,
        customMessage: 'User profile updated successfully',
        type: 'PROFILE_UPDATE'
    },
    USERS_DATA_FETCH: {
        statusCode: 200,
        customMessage: 'Users fetched successfully',
        type: 'USERS_DATA_FETCH'
    },
    USER_DATA_FETCH: {
        statusCode: 200,
        customMessage: 'User fetched successfully',
        type: 'USER_DATA_FETCH'
    },
    USER_DELETE: {
        statusCode: 200,
        customMessage: 'User deleted successfully',
        type: 'USER_DELETE'
    },
    UPDATE_USER_ROLE: {
        statusCode: 200,
        customMessage: 'User role updated successfully',
        type: 'UPDATE_USER_ROLE'
    },
    PRODUCT_CREATED: {
        statusCode: 200,
        customMessage: 'Product created successfully',
        type: 'PRODUCT_CREATED'
    },
    PRODUCT_LIST_FETCH: {
        statusCode: 200,
        customMessage: 'Product list fetched successfully',
        type: 'PRODUCT_LIST_FETCH'
    },
    PRODUCT_UPDATE: {
        statusCode: 200,
        customMessage: 'Product updated successfully',
        type: 'PRODUCT_UPDATE'
    },
    PRODUCT_DELETE: {
        statusCode: 200,
        customMessage: 'Product deleted successfully',
        type: 'PRODUCT_DELETE'
    },
    PRODUCT_DETAILS: {
        statusCode: 200,
        customMessage: 'Product details fetched successfully',
        type: 'PRODUCT_DETAILS'
    },
    REVIEW_CREATED: {
        statusCode: 200,
        customMessage: 'Review created successfully',
        type: 'REVIEW_CREATED'
    },
    REVIEW_FETCHED: {
        statusCode: 200,
        customMessage: 'Review fetched successfully',
        type: 'REVIEW_FETCHED'
    },
    REVIEW_DELETED: {
        statusCode: 200,
        customMessage: 'Review deleted successfully',
        type: 'REVIEW_DELETED'
    },
    ORDER_CREATED: {
        statusCode: 200,
        customMessage: 'Order created successfully',
        type: 'ORDER_CREATED'
    },
    SINGLE_ORDER_FETCHED: {
        statusCode: 200,
        customMessage: 'Order fetched successfully',
        type: 'SINGLE_ORDER_FETCHED'
    },
    ALL_ORDER_FETCHED: {
        statusCode: 200,
        customMessage: 'All order fetched successfully',
        type: 'ALL_ORDER_FETCHED'
    },
    ORDER_UPDATED: {
        statusCode: 200,
        customMessage: 'Order updated successfully',
        type: 'ORDER_UPDATED'
    },
    ORDER_DELETED: {
        statusCode: 200,
        customMessage: 'Order deleted successfully',
        type: 'ORDER_DELETED'
    },
    CATEGORY_LIST_FETCH: {
        statusCode: 200,
        customMessage: 'Category list fetched successfully',
        type: ' CATEGORY_LIST_FETCH'
    },
    CATEGORY_CREATED: {
        statusCode: 200,
        customMessage: 'Category created successfully',
        type: 'CATEGORY_CREATED'
    },
    CATEGORY_UPDATE: {
        statusCode: 200,
        customMessage: 'Product updated successfully',
        type: 'CATEGORY_UPDATE'
    },
    CATEGORY_DELETED: {
        statusCode: 200,
        customMessage: 'Category deleted successfully',
        type: 'CATEGORY_DELETED'
    },
    CART_ITEMS_FETCH: {
        statusCode: 200,
        customMessage: 'Cart items list fetched successfully',
        type: ' CART_ITEMS_FETCH'
    },
    CART_ITEMS_ADDED: {
        statusCode: 200,
        customMessage: 'Cart items added successfully',
        type: 'CART_ITEMS_ADDED'
    },
    CART_ITEM_DELETE: {
        statusCode: 200,
        customMessage: 'Cart items deleted successfully',
        type: 'CART_ITEM_DELETE'
    },

    PROCESS_PAYMEMNT: {
        statusCode: 200,
        customMessage: 'Created successfully',
        type: 'PROCESS_PAYMEMNT'
    },

    GET_STRIPE_SECRET_KEY: {
        statusCode: 200,
        customMessage: 'Get stripe scret key successfully',
        type: 'GET_STRIPE_SECRET_KEY'
    },

    ORDER_CANCELLED: {
        statusCode: 200,
        customMessage: 'Order cancelled successfully',
        type: 'ORDER_CANCELLED'
    },

};

