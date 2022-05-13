import React, { useEffect,useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Main from '../template/Main'
import RenderTable from "../../shared/components/form/components/tableForm";
import 'font-awesome/css/font-awesome.min.css'
import ChartCard from "../../shared/components/chart_card/chartCard";
import axios from 'axios';
import { getStoriesAction } from './redux/actions'
import PieChart from "../../shared/components/results/chart";
import RegisterForm from "../../shared/components/form/components/registerForm";

import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import CustomizedAccordions from "../../shared/components/accordion/acordion";
import ProgressIndicator from "../../shared/components/loading/progressIndicator";
let categoies
export default (props) => {
    const [loadingState, tableLoadingState] = useState(true)
    let categoryId;
    const dispatch = useDispatch()
    const StoreReducer = useSelector((state => state.storeReducer))

    function getStories() {
        dispatch(getStoriesAction(props.categoryId))
    }
    async function onSaveButton(e) {
        await axios.post(` https://g20-api-rest.herokuapp.com/category/store`,{
            
                categoryId:categoryId,
                store: {
                    name:e.inputs[0].value,
                    pix:e.inputs[1].value
                }
             
        })
       
    }
    
    async function getCategories() {
        tableLoadingState(true)
       const response = await axios.get(` https://g20-api-rest.herokuapp.com/category`,)
       categoies = response.data
       tableLoadingState(false)
    }
    useEffect(() => {
        getStories()
        getCategories()
        
    }, []);
 
    function acordeon() {
        console.log(categoies)
        return (
            loadingState==true?<ProgressIndicator></ProgressIndicator>:
            <div>
                <CustomizedAccordions
                    child={
                        {
                            titile: 'DashBoard',
                            component: () => {
                                return (
                                    <div>
                                        <PieChart></PieChart>
                                        <ChartCard
                                            data={[
                                                {
                                                    title: 'title',
                                                    color: 'blue',
                                                    description: 'subtitle',
                                                    value: 'R$ 100,00',

                                                },
                                                {
                                                    title: 'title',
                                                    color: 'blue',
                                                    description: 'subtitle',
                                                    value: 'R$ 100,00',

                                                },
                                                {
                                                    title: 'title',
                                                    color: 'blue',
                                                    description: 'subtitle',
                                                    value: 'R$ 100,00',

                                                },
                                                {
                                                    title: 'title',
                                                    color: 'blue',
                                                    description: 'subtitle',
                                                    value: 'R$ 100,00',

                                                },
                                                {
                                                    title: 'title',
                                                    color: 'blue',
                                                    description: 'subtitle',
                                                    value: 'R$ 100,00',

                                                }
                                            ]}
                                        ></ChartCard>
                                    </div>
                                )
                            }
                        }
                    }
                >
                </CustomizedAccordions>
                <CustomizedAccordions
                    child={
                        {
                            titile: 'Cadastro de Loja ',
                            component: () => {
                                return (
                                    <div>
                                        <RegisterForm
                                            menu ={{
                                                onChange:(e)=>{categoryId =e.toString()},
                                                title:'categorias',
                                                itens:categoies.map(e=>({name:e.name,value:e._id}))
                                            }}
                                            img={
                                                {label: 'img',
                                                    value: '',}
                                            }
                                            onSaveButtonAction={e => { onSaveButton(e) }}
                                            inputs={
                                                [
                                                    {
                                                        label: 'nome',
                                                        value: '',
                                                    },
                                                    {
                                                        label: 'pix',
                                                        value: '',
                                                    }
                                                ]
                                            }
                                        >

                                        </RegisterForm>
                                    </div>
                                )
                            }
                        }
                    }
                >
                </CustomizedAccordions>
                <CustomizedAccordions
                    child={
                        {
                            titile: 'Todas as Lojas',
                            component: () => {
                                return (
                                    <div>

                                        <RenderTable
                                            editCallback={e => { onStore(e) }}
                                            deleteCallback={e => { }}
                                            resultsCallback={e => { }}
                                            thList={[
                                                'pix', 'nome', 'count', 'ações'
                                            ]}
                                            tdList={
                                                StoreReducer.stories.map(e => (
                                                    {
                                                        id: e._id,
                                                        values: [
                                                            e.pix,
                                                            e.name,
                                                            e.products.length]
                                                    }
                                                ))


                                            }

                                        >

                                        </RenderTable>
                                    </div>
                                )
                            }
                        }
                    }
                >
                </CustomizedAccordions>

            </div>
        )
    }
    
     function onStore(e) {
        return(
            <Link className="btn btn-warning" to='/store' 
                        state = {{storeId:e._id}} >
                            <i className="fa fa-pencil"></i></Link>
        )
     }
    return (
        <Main>
            {acordeon()}
        </Main>
    )
}
