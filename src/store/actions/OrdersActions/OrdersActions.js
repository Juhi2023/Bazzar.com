import { GET_MY_ORDERS, CREATE_ORDER, GET_ORDER_DETAILS, GET_ALL_ORDERS, UPDATE_ORDER, DELETE_ORDER, CANCEL_ORDER } from "../../constant";

export function createOrder(data) {
    return {
        type: CREATE_ORDER,
        data
    };
}

export function getMyOrders(data) {
    return {
        type: GET_MY_ORDERS,
        data,
    };
}

export function getOrderDetails(data) {
    return {
        type: GET_ORDER_DETAILS,
        data,
    };
}

export function getAllOrders(data) {
    return {
        type: GET_ALL_ORDERS,
        data,
    };
}

export function updateOrder(data) {
    return {
        type: UPDATE_ORDER,
        data,
    };
}

export function deleteOrder(data) {
    return {
        type: DELETE_ORDER,
        data,
    };
}

export function cancelOrder(data) {
    return {
        type: CANCEL_ORDER,
        data,
    };
}