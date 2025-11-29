import { 
    GET_DASHBOARD_DATA,
    GET_ADMIN_PRODUCTS,
    CREATE_PRODUCT,
    UPDATE_PRODUCT,
    DELETE_PRODUCT
} from "../../constant";

export function getDashboardData(data) {
    return {
        type: GET_DASHBOARD_DATA,
        data
    };
}


export const getAdminProducts = (products) => ({
    type: GET_ADMIN_PRODUCTS,
    products
});

export const createProduct = (product) => ({
    type: CREATE_PRODUCT,
    product
});

export const updateProduct = (productId, updates) => ({
    type: UPDATE_PRODUCT,
    productId,
    updates
});

export const deleteProduct = (productId) => ({
    type: DELETE_PRODUCT,
    productId
});