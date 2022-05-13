import {createReducer,createAction} from '@reduxjs/toolkit'

export const getStories = createAction('GET_STORIES')
export const editStore  = createAction('EDIT_PRODUCTS')
export const deleteStore = createAction('DELETE_PRODUCT')

const initialState = {stories:[]}
export default createReducer(initialState,{
    [getStories.type]:(state,action) =>action.payload,
    [editStore.type]:(state,action)  =>action.payload,
    [deleteStore.type]:(state,action) =>action.payload,
})


