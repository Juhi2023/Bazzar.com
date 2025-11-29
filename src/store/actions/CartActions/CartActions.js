import { ADD_ITEM_TO_CART, DELETE_ITEM_FROM_CART, GET_CART_ITEMS_LIST} from "../../constant";

export function getCartItemsList(data) {
    return {
        type: GET_CART_ITEMS_LIST,
        data
    };
}

export function addItemToCart(data) {
    return {
        type: ADD_ITEM_TO_CART,
        data
    };
}

export function deleteItemFromCart(data) {
    return {
        type: DELETE_ITEM_FROM_CART,
        data
    };
}
