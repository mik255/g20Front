import React from 'react';
import ProgressIndicator from '../../../../shared/components/loading/progressIndicator';
import { updateStoreProduct } from '../../redux/actions'
import { getProductsFromStoreById} from '../../redux/actions'
import {closeEditProductModal } from '../../components/modal/redux/actions'
import {useDispatch } from "react-redux";
function FormRegister(props) {
    const [state, update] = React.useState(0)
    const [loadingState, setLoading] = React.useState(false)
    const dispatch = useDispatch()
    function setName(value) {
        console.log(props.product)
        props.product.name = value
        update(state + 1)
    }
    function setImg(value) {
        props.product.img = value
        update(state + 1)
    }
    function setPrice(value) {
        props.product.price = value
        update(state + 1)
    }
    function setPrice_square(value) {
        props.product.price_square = value
        update(state + 1)
    }
    async function updateProduct() {
        setLoading(true)
        await updateStoreProduct(props.product)
        setTimeout(()=>{
            setLoading(false)
            dispatch(closeEditProductModal ()) 
            dispatch(getProductsFromStoreById(props.storeId))
        },3000)
       
    }

    const srcImg = 'https://cdn-icons-png.flaticon.com/512/1930/1930101.png'
    function renderImg() {
        return (
            <div className="card">
                <img src={props.product?.img ?? srcImg} className='productImg'></img>
            </div>

        )
    }
    function renderForm() {
        return (
            <div className="form" >
                <div className="row" >
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label >Nome</label >
                            <input type="text" className="form-control"
                                name="name"
                                value={props.product.name}
                                onChange={e => setName(e.target.value)}
                                placeholder="Digite o nome...." />
                        </div>
                    </div>
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>img</label>
                            <input type="text" className="form-control"
                                name="img"
                                value={props.product.img}
                                onChange={e => setImg(e.target.value)}
                                placeholder="Digite o nome...." />
                        </div>
                    </div>
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Preço</label>
                            <input type="text" className="form-control"
                                name="price"
                                value={props.product.price}
                                onChange={e => setPrice(e.target.value)}
                                placeholder="Digite o nome...." />
                        </div>
                    </div>
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Preço Praça</label>
                            <input type="text" className="form-control"
                                name="price_square"
                                value={props.product.price_square}
                                onChange={e => setPrice_square(e.target.value)}
                                placeholder="Digite o pix...." />
                        </div>
                    </div>

                    <h1></h1>
                </div>

                <div className="row">
                    <div className="col-12 d-flex justify-content-end">
                        <button className="btn btn-primary"
                            onClick={async e => await updateProduct()}>
                            atualizar
                        </button>
                        <button className="btn btn-secondary ml-2"
                            onClick={e => { }}>
                            cancelar
                        </button>
                    </div>
                </div>
                <p>{''}</p>
            </div>
        )
    }
    if (loadingState == false) {
        return (
            <div>
                {renderImg()}
                {renderForm()}
            </div>
        )
    } else {
       return <div>
           <ProgressIndicator/>
       </div>
    }
}

export default FormRegister;