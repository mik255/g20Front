import React, {useEffect } from "react";
import Main from '../../template/Main'
import 'font-awesome/css/font-awesome.min.css'
import './products.css'
import { useSelector, useDispatch } from "react-redux";
import { getProductsFromStoreById,deleteStoreProduct} from '../redux/actions'
import { openEditProductModal} from '../components/modal/redux/actions'
import Modal from '../components/modal/modal.js';
import ProductRegister from "../components/productRegister/productRegister";
import SnackBar from "../../../shared/components/snackBar/snackBar";
import $ from 'jquery';
export default (props) => {

    const dispatch = useDispatch()
    const ProductReducer = useSelector((state => state.productReducer))
   
   console.log(ProductReducer)
    const storeId = props.storeId

    function getProducts(){

        dispatch(getProductsFromStoreById(storeId))
        myFunction()
    }
    useEffect(() => {
        getProducts()
    },[]);


   async function editProduct(product) {
       dispatch(openEditProductModal(product,storeId))
    }

    async function deleteProduct(product) {
        dispatch(deleteStoreProduct(product._id))
        dispatch(getProductsFromStoreById(storeId))
     }

    function renderTable() {
        return <table id="escalation" className="table " style={{ textAlign: 'center' }}>
            <thead>
                <tr> <th>img</th>
                    <th>nome</th>
                    <th>Preço</th>
                    <th>Preço Praça</th>
                    <th>Ações</th>
                </tr>
            </thead>
            <tbody>
                {renderRows()}
            </tbody>
        </table>

    }
    function renderRows() {

        return ProductReducer.products.map(product => {
            return (

                <tr style={{ textAlign: 'center' }} key={product._id}>
                    <td className="td">{renderItemImg(product.img)}</td>
                    <td>{product.name}</td>
                    <td>{product.price}</td>
                    <td>{product.price_square}</td>
                    <td>
                        <a>
                            <button className="btn btn-warning"
                                onClick={() => { editProduct(product) }}>
                                <i className="fa fa-pencil"></i>
                            </button></a>
                        <button className="btn btn-danger ml-2"
                            onClick={() => { deleteProduct(product)}}>
                            <i className="fa fa-trash"></i>
                        </button>

                    </td>
                </tr>
            )
        })
    }
  
    function renderItemImg(img) {
        return (
            <img src={img} className='productImgItem'></img>
        )
    }
    function myFunction() {
        var x = document.getElementById("snackbar");
        x.className = "show";
        setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
      }
    return (
        <Main>
            <Modal/>
            <ProductRegister storeId={storeId}/>
            {renderTable()}
            <SnackBar message ={'Atualização feita com sucesso'}/>
        </Main>
    )
}
