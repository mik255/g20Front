import React,{useEffect,useState} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Main from '../template/Main'
import axios from 'axios';
import CustomizedAccordions from "../../shared/components/accordion/acordion";
import ProgressIndicator from '../../shared/components/loading/progressIndicator';
function createData(id,nome,quantidade) {
  return {id, nome, quantidade };
}

let orderslist
export default function DenseTable() { 
  React.useEffect(() => {
    getOrders()
    
}, []);
  const [loadingState, tableLoadingState] = useState(true)
    async function getOrders(){
        tableLoadingState(true)
        const ordersResponse = await axios.get(` https://g20-api-rest.herokuapp.com/orders`)
        orderslist = ordersResponse.data
        tableLoadingState(false)    
    }
    async function finishSession(){
      tableLoadingState(true)
      await axios.delete(`https://g20-api-rest.herokuapp.com/orders/finishedSection`)
      orderslist = []
      tableLoadingState(false)    
  }
    function total(){
      const allproducts =[];
      //pega todos os produtos
      orderslist.map(e=>e.order.products.map
        (e=>{
          
          allproducts.unshift({name:e.name,count:e.count})
        
        }))
        //elimina duplicatas
        const allproductsSet = allproducts.filter
        ((elem,index,arr)=> index!=0?elem.name!=arr[index-1].name:elem)
        //soma
        const totalcount =
        allproductsSet.map(e=>{
          const list = allproducts.filter((elem,index,arr)=> e.name==elem.name)
          const value = {name:e.name,count:0}
           list.forEach(e=>{value.count+=e.count})
           return value
        })
        
        return( <div>
          <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell align="center">Nome do produto</TableCell>
                <TableCell align="center">total</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {totalcount.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
                  <TableCell align="center"> {row.name}</TableCell>
                  <TableCell align="center">{row.count}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer></div>
        )
        
    }
    function tableRender(){
      
     
      const orderTable = orderslist.map(e=>{
        const rows = e.order.products.map((e)=>createData(e._id,e.name, e.count,))
        
        return(<CustomizedAccordions
        child={{titile:`${e.order.user.name} - cpf: ${e.order.user.indentify.cpf}`,
          component: () => {
          return( <div>
            <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
              <TableHead>
                <TableRow>
                  <TableCell align="center" >Id</TableCell>
                  <TableCell align="center">Nome do produto</TableCell>
                  <TableCell align="center">Quantidade do produto</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow
                    key={row.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                     <TableCell align="center">
                      {row.id}
                    </TableCell>
                    <TableCell align="center">
                      {row.nome}
                    </TableCell>
                    <TableCell align="center">{row.quantidade}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer></div>
          )}
        }}
        >
          
        </CustomizedAccordions>)})
        return orderTable
    }
    

   

  return (
      <Main>
      {loadingState===true?<ProgressIndicator></ProgressIndicator>:tableRender()},
      {loadingState===true?<div></div>:total()}
      {orderslist?.length!=0&&loadingState===false?<Button 
      
      onClick={async () => {
         await finishSession()
      }}
      variant="contained">Finalizar</Button>:
      <div>Sem pedidos</div>
      }
   </Main>
  );
}
