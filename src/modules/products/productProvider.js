import { Provider } from 'react-redux'
import ProductStore from '../../modules/products/redux/store'
import ProductPage from '../products/pages/products'
import {useLocation} from "react-router-dom";

function ProductProvider() {
    let location = useLocation();
    
    return (
             <Provider store={ProductStore}>
             <ProductPage storeId ={location.state.storeId}/>
             </Provider>
    )
}

export default ProductProvider