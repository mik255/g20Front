import { createReducer, createAction } from '@reduxjs/toolkit'

export const addCurrentProduct = createAction('CURRENT_PRODUCT')

const initialState = {
    name: '',
    img: '',
    price: 0,
    price_square: 0,
    count: 0
}
export default createReducer(initialState, {
    [addCurrentProduct.type]: (state, action) => action.payload,
})

