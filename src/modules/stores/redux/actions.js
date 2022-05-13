import api from "../../../core/services/api";
import { getStories, deleteStore, editStore } from "./reducer";

export const getStoriesAction = (id) => {
    if(id!=null){
        return (dispatch) => {
            api.get(`/category/${id}`).then(res => {
                dispatch(getStories({ stories: res.data.stores }))
            }
            ).catch(e => console.log)
        } 
    }else{
    return (dispatch) => {
        api.get(`/store`).then(res => {
            dispatch(getStories({ stories: res.data }))
        }
        ).catch(e => console.log)
    }}
}

export const deleteStoreAction = (storeId) => {
    return (dispatch) => {
        api.delete(`/store/${storeId}`).then(res =>
            dispatch(deleteStore(res.data))
        ).catch(e => console.log)
    }
}
export const updateStoreAction = async (store) => {
    return (dispatch) => {
        api.put(`/store/${store._id}`, store).then(res =>
            dispatch(editStore(res.data))
        ).catch(e => console.log)
    }
}
