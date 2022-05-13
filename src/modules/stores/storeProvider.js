import { Provider } from 'react-redux'
import StoreStore from '../stores/redux/store'
import StorePage from '../stores/stores'
import {useLocation} from "react-router-dom";

function StoreProvider(props) {
    let location = useLocation();
    console.log(location)
    return (
             <Provider store={StoreStore}>
             <StorePage categoryId={location.state?.categoryId}/>
             </Provider>
    )
}

export default StoreProvider