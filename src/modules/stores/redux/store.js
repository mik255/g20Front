import {configureStore} from '@reduxjs/toolkit'
import storeReducer from './reducer'

export default configureStore({
    reducer:{
        storeReducer:storeReducer,
    }
})