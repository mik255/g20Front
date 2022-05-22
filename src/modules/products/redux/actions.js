import api from "../../../core/services/api";
import axios from "axios";
import { readProducts, deleteProduct, } from "./reducer";

export const getProductsFromStoreById = (storeId) => {
    return (dispatch) => {
        api.get(`/store/${storeId}`).then(res => {
            
            dispatch(readProducts({ products: res.data.products }))
        }
        ).catch(e => console.log)
    }
}

export const insertProductIntoStore = (storeId, product) => {
    return api.post(`/store/products`, { storeId: storeId, product: product })
}
export const deleteStoreProduct = (productId) => {
    return (dispatch) => {
        api.delete(`/products/${productId}`).then(res =>
            dispatch(deleteProduct(res.data.product))
        ).catch(e => console.log)
    }
}
export const updateStoreProduct = (product) => {
    return api.put(`/products/${product._id}`, product)
}
