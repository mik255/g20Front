import {configureStore} from '@reduxjs/toolkit'
import productReducer from './reducer'
import modalReducer from '../components/modal/redux/reducer'

export default configureStore({
    reducer:{
        productReducer:productReducer,
        modalReducer:modalReducer,
    }
})