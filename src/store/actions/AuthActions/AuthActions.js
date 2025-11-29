import { CHECK_AUTH_STATUS, FORGOT_PASSWORD, LOGIN, REMOVE_SIGNUP_DATA, SIGNUP, OTP_VERIFICATION, RESEND_OTP, CHECK_RESET_PASSWORD_TOKEN_VALIDATION, RESET_PASSWORD, LOGOUT, GET_USER_DETAILS, UPDATE_USER_DETAILS, UPDATE_PASSWORD, GET_USER_ADDRESS, UPDATE_USER_ADDRESS, DELETE_ACCOUNT} from "../../constant";

export function forgotPassword(data) {
    return {
        type: FORGOT_PASSWORD,
        data
    };
}

export function login(data) {
    return {
        type: LOGIN,
        data
    };
}

export function signUp(data) {
    return {
        type: SIGNUP,
        data
    };
}

export function removeSignUpData() {
    return {
        type: REMOVE_SIGNUP_DATA
    };
}

export function checkAuthStatus(data) {
    return {
        type: CHECK_AUTH_STATUS,
        data
    };
}


export function verifyOTP(data) {
    return {
        type: OTP_VERIFICATION,
        data
    };
}

export function resendOTP(data) {
    return {
        type: RESEND_OTP,
        data
    };
}

export function checkResetPasswordToken(data) {
    return {
        type: CHECK_RESET_PASSWORD_TOKEN_VALIDATION,
        data
    };
}

export function resetPassword(data) {
    return {
        type: RESET_PASSWORD,
        data
    };
}

export function logout(data) {
    return {
        type: LOGOUT,
        data
    };
}

export function getUserProfileData(data) {
    return {
        type: GET_USER_DETAILS,
    };
}

export function updateUserDetails(data) {
    return {
        type: UPDATE_USER_DETAILS,
        data
    };
}

export function updatePassword(data) {
    return {
        type: UPDATE_PASSWORD,
        data
    };
}

export function getUserAddress(data) {
    return {
        type: GET_USER_ADDRESS,
    };
}

export function updateUserAddress(data) {
    return {
        type: UPDATE_USER_ADDRESS,
        data
    };
}

export function deleteAccount(data) {
    return {
        type: DELETE_ACCOUNT,
    };
}