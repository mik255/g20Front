import React, {useEffect,useState } from "react";
import Main from '../../template/Main'
import 'font-awesome/css/font-awesome.min.css'
import './products.css'
import { useSelector, useDispatch } from "react-redux";
import { getProductsFromStoreById,deleteStoreProduct, getStoreInfoFromId} from '../redux/actions'
import { openEditProductModal} from '../components/modal/redux/actions'
import Modal from '../components/modal/modal.js';
import ProductRegister from "../components/productRegister/productRegister";
import SnackBar from "../../../shared/components/snackBar/snackBar";
import $ from 'jquery';
import axios from 'axios';
import ProgressIndicator from "../../../shared/components/loading/progressIndicator";
var totalValueFromAllReceipts = 0;
export default (props) => {
    const dispatch = useDispatch()
    const ProductReducer = useSelector((state => state.productReducer)) 
    const [loadingState, tableLoadingState] = useState(true)
    const storeId = props.storeId
    
        async function getStoreInfo(id) {
            tableLoadingState(true)
           const response = await axios.get(`https://g20-api-rest.herokuapp.com/receipts/storeReceipts/${id}`,)
           totalValueFromAllReceipts = response.data.totalValueFromAllReceipts
           tableLoadingState(false)
           console.log("aqui")
           console.log(totalValueFromAllReceipts)
        }
    

    function getProducts(){
        dispatch(getProductsFromStoreById(storeId))
        myFunction()
    }
    useEffect(() => {
        getStoreInfo(storeId)
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
            <div>Total da loja</div> R$&nbsp;
            {loadingState==true?<ProgressIndicator></ProgressIndicator>:totalValueFromAllReceipts}
            <ProductRegister storeId={storeId}/>
            {renderTable()}
            <SnackBar message ={'Atualização feita com sucesso'}/>
        </Main>
    )
}
