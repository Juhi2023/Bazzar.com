import { ADD_UPDATE_REVIEWS, DELETE_REVIEW, GET_PRODUCT_DETAILS, GET_PRODUCT_LIST } from "../../constant";

export function getProductList(data) {
    return {
        type: GET_PRODUCT_LIST,
        data
    };
}

export function getProductDetails(data) {
    return {
        type: GET_PRODUCT_DETAILS,
        data,
    };
}

export function addUpdateReview(data) {
    return {
        type: ADD_UPDATE_REVIEWS,
        data,
    };
}

export function deleteReview(data) {
    return {
        type: DELETE_REVIEW,
        data,
    };
}