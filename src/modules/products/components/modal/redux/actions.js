import {openModal,closeModal} from "./reducer";

export const openEditProductModal = (product,storeId) =>{
     return (dispatch)=>{dispatch(openModal({
         storeId:storeId,
         product:product,
         isOpen:true,
        }))}
    }

    export const closeEditProductModal = () =>{
        return (dispatch)=>{
            dispatch(closeModal({isOpen:false,}))}
       }
      
