import {createReducer,createAction} from '@reduxjs/toolkit'

export const createProduct = createAction('CREATE_PRODUCTS')
export const readProducts  = createAction('READ_PRODUCTS')
export const readReceiptProducts  = createAction('READRECEIPT_PRODUCTS')
export const deleteProduct = createAction('DELETE_PRODUCT')

const initialState = {products:[]}
export default createReducer(initialState,{
    [createProduct.type]:(state,action) =>action.payload,
    [readProducts.type]:(state,action)  =>action.payload,
    [readReceiptProducts.type]:(state,action)  =>action.payload,
    [deleteProduct.type]:(state,action) =>action.payload,
})


