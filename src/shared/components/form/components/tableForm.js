import {Link} from 'react-router-dom'
import React from "react";
import 'font-awesome/css/font-awesome.min.css';
function renderItemImg(img) {
    return (
        <img src={img} className='productImgItem'></img>
    )
}
function renderTable(props) {
    return <table id="escalation" className="table" style={{ textAlign: 'center' }}>
        <thead>
            <tr> 
            {props.thList.map(e=> <th>{e}</th>)}
            </tr>
        </thead>
        <tbody>
            {renderRows(props)}
        </tbody>
    </table>

}
function renderRows(props) {

    return props.tdList.map(e => {
        return (

            <tr style={{ textAlign: 'center' }} key={e.id}>
                {e.img&&<td className="td">{renderItemImg(e.img)}</td>}
                {e.values.map(value=> <td>{value}</td>)}
                <td>
                <Link className="btn btn-warning" to='/products' 
                        state = {{storeId:e.id}} >
                            <i className="fa fa-pencil"></i></Link>
                    <button className="btn btn-danger ml-2"
                        onClick={() => {props.deleteCallback(e)}}>
                        <i className="fa fa-trash"></i>
                    </button>
            
                </td>
            </tr>
        )
    })
}
export default renderTable