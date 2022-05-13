import { createReducer, createAction } from '@reduxjs/toolkit'

export const openModal = createAction('OPEN_MODAL')
export const closeModal = createAction('CLOSE_MODAL')
const initialState = {
    isOpen:false,
}
export default createReducer(initialState, {
    [openModal.type]: (state, action) => action.payload,
    [closeModal.type]: (state, action) => action.payload,
})


