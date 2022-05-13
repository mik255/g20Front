import React, {Component} from "react";
import Main from '../template/Main'
import axios from 'axios' 
import 'font-awesome/css/font-awesome.min.css'
import RegisterForm from "../../shared/components/form/components/registerForm";
import CustomizedAccordions from "../../shared/components/accordion/acordion";
import ProgressIndicator from "../../shared/components/loading/progressIndicator";
import RenderTable from "../../shared/components/form/components/tableForm";
let initialState ={
    response:'response',
    user:{
        name:'',
        indentify:{
            cpf:'',
            cnpj:''
        },
        password:'',
    },
    list:[]
}
var state = {...initialState} 
export default ()=>{
    function onSaveButton(e){
        state.user.name = e[0].value
        state.user.indentify.cpf = e[1].value
        state.user.indentify.cnpj = e[2].value
        state.user.password = e[3].value
        console.log(state.user)
        saveUser(state.user)
    }
    const [loadingState, tableLoadingState] = React.useState(true)
   
    async function getUsers(){
        tableLoadingState(true)
        const usersResponse = await axios.get(` https://g20-api-rest.herokuapp.com/users`)
        state.list = usersResponse.data
        tableLoadingState(false)    
    }
    async function saveUser(user){
        tableLoadingState(true)
        await axios.post(` https://g20-api-rest.herokuapp.com/users`,user)
        await  getUsers() 
    }
    React.useEffect(() => {
        getUsers()
        
    }, []);
    return (
        <Main>
           {loadingState==false? <div>
            <CustomizedAccordions
                    child={
                        {
                            titile: 'Cadastro de logista',
                            component: () => {
                                return (
                                    <div>
                                        <RegisterForm
                                            
                                            onSaveButtonAction={e => { onSaveButton(e.inputs) }}
                                            inputs={
                                                [
                                                    {
                                                        label: 'nome',
                                                        value: '',
                                                    },
                                                    {
                                                        label: 'cpf',
                                                        value: '',
                                                    },
                                                    {
                                                        label: 'cnpj',
                                                        value: '',
                                                    },
                                                    {
                                                        label: 'senha',
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
                            titile: 'Todas os logistas',
                            component: () => {
                                return (
                                    <div>

                                        <RenderTable
                                            editCallback={e => {
                                                
                                            }}
                                            deleteCallback={e => { }}
                                            resultsCallback={e => { }}
                                            thList={[
                                                'nome', 'cpf', 'cnpj', 'senha','ações'
                                            ]}
                                            tdList={
                                                state.list.map(e => (
                                                    {
                                                        id: e._id,
                                                        values: [
                                                            e.name,
                                                            e.indentify.cpf,
                                                            e.indentify.cnpj,
                                                            e.password
                                                        ]
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
            </div>:<ProgressIndicator></ProgressIndicator>}
        
        </Main>
    )     
    
}