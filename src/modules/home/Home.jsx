import React from "react";
import ProgressIndicator from "../../shared/components/loading/progressIndicator";
import Main from '../template/Main'
import Card from './components/card'
import Pie  from './components/chart'
import CustomizedSwitches from "./components/switchPeriod";
import './Home.css'
import axios from 'axios';
const state = {period:false}
function DashBoard (props){
    const [loadingState, setLoading] = React.useState(true)
    React.useEffect(()=>{
      getCurrentPeriod() 
    },[])
    async function getCurrentPeriod(){
        setLoading(true)
        const periodResponse = await axios.get(`https://g20-api-rest.herokuapp.com/config`
        )
        state.period = periodResponse.data.period;
        setLoading(false) 
    }
    async function setPeriod(e){
        setLoading(true)
        const periodResponse = await axios.put(`https://g20-api-rest.herokuapp.com/config/625489179bbb470a8c465a0a`
        ,{period:e})
        console.log(periodResponse)
        state.period = periodResponse.data.data.period;
        setLoading(false) 
    }
    if (loadingState == false) {
        console.log(state.period)
        return(<Main icon="home" title={props.title} subtitle={props.subtitle}>
            <CustomizedSwitches checked = {state.period}
            onChange = {e=>{
                 setPeriod(e)
            }}
            ></CustomizedSwitches>
        <div><Pie/></div>
        <div className="row body-cards">
            <Card color='blue' title='Boletos' value='258' description='Total de todos os boletos gerados até agora.'/>
            <Card color='green' title='Produtos' value='874' description='Somatório de todos os itens gerados até agora.'/>
             {/* <Card color='orange' title='' value='R$ 15.585,00' description='Somatório dos preços com g20 de todos os itens gerados até agora.'/> */}
            <Card color='red' title='Total de vendas' value='128' description='Somatório do preço praça de todos os...'/> 
            <Card color='yelow' title='Margem de lucro' value='80%' description='Diferença entre o preço praça e o preço com g20'/>
            <Card color='blue-dark' title='Tiket médio' value='R$ 5.785,45' description='Faturamento total / Total de produtos gerados '/>
        </div>
    </Main>)
    } else {
       return <Main className= ' center' icon="home" title={props.title} subtitle={props.subtitle}>
           <ProgressIndicator/>
           </Main>
    }
  
    }

    export default DashBoard