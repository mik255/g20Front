import {addCurrentProduct} from "./formRegisterSlice";

export const addCurrentProductEvent = (product) =>{
     return (dispatch)=>{dispatch(addCurrentProduct(product))}
    }
    
