import React from 'react';
import {Modal as ModalComponent} from 'antd'
import FormRegister from '../formRegister/formRegister';
import { useSelector,useDispatch} from "react-redux";
import {closeEditProductModal } from '../../components/modal/redux/actions'
function Modal() {
    const ModalReducer = useSelector((state => state.modalReducer))
    const dispatch = useDispatch()
    console.log(ModalReducer)
    const product = {...ModalReducer.product}
    return (
        <div>
            <ModalComponent visible = {ModalReducer.isOpen} onCancel={()=>{
                  dispatch(closeEditProductModal ())
            }}>
            <FormRegister storeId = {ModalReducer.storeId} product={product}/>
            </ModalComponent>
        </div>
    );
}

export default Modal;