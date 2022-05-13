import React from 'react';
import ProgressIndicator from '../../../../shared/components/loading/progressIndicator';
import { insertProductIntoStore } from '../../redux/actions'
import {useDispatch } from "react-redux";
import { getProductsFromStoreById} from '../../redux/actions'
const initialState = {
product:{
    name:'',
    img:'',
    price:0,
    price_square:0,
    count:0
}
}
function ProductRegister(props) {
    const [product, setProduct] = React.useState({...initialState})
    const [loadingState, setLoading] = React.useState(false)
    const dispatch = useDispatch()
    function setName(value) {
        product.name = value
        setProduct({...product})
    }
    function setImg(value) {
        product.img = value
        setProduct({...product})
    }
    function setPrice(value) {
        product.price = value
        setProduct({...product})
    }
    function setPrice_square(value) {
        product.price_square = value
         setProduct({...product})
    }
    async function insertProduct() {
        product.count=0;
        setLoading(true)
        await insertProductIntoStore(props.storeId,product)
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth"
          });
        setTimeout(()=>{
            setLoading(false)
            dispatch(getProductsFromStoreById(props.storeId))
            window.scrollTo({
                top: 500,
                left: 0,
                behavior: "smooth"
              });
        },2000)  
       
    }
    function clean(){
        const {product} = initialState;
    setProduct({...product})
    }

    const srcImg = 'https://cdn-icons-png.flaticon.com/512/1930/1930101.png'
    function renderImg() {
        return (
            <div className="card">
                <img src={product.img===''?srcImg:product.img} className='productImg'></img>
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
                                value={product.name}
                                onChange={e => setName(e.target.value)}
                                placeholder="Digite o nome...." />
                        </div>
                    </div>
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>img</label>
                            <input type="text" className="form-control"
                                name="img"
                                value={product.img}
                                onChange={e => setImg(e.target.value)}
                                placeholder="Digite o nome...." />
                        </div>
                    </div>
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Preço</label>
                            <input type="text" className="form-control"
                                name="price"
                                value={product.price}
                                onChange={e => setPrice(e.target.value)}
                                placeholder="Digite o nome...." />
                        </div>
                    </div>
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Preço Praça</label>
                            <input type="text" className="form-control"
                                name="price_square"
                                value={product.price_square}
                                onChange={e => setPrice_square(e.target.value)}
                                placeholder="Digite o pix...." />
                        </div>
                    </div>

                    <h1></h1>
                </div>

                <div className="row">
                    <div className="col-12 d-flex justify-content-end">
                        <button className="btn btn-primary"
                            onClick={async e => await insertProduct()}>
                            Registrar
                        </button>
                        <button className="btn btn-secondary ml-2"
                            onClick={e => clean()}>
                            Limpar
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

export default ProductRegister;