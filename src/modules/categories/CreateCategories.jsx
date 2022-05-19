import React, { Component, component } from "react";
import CreateStore from '../stores/stores'
import {Route, Link } from 'react-router-dom';
import Main from '../template/Main'
import axios from 'axios'
import 'font-awesome/css/font-awesome.min.css'
import './CreateCAtegories.css'
const headerProps = {
    title: 'usuários',
    subtitle: 'Cadastro de Categorias'
}

let initialState = {
    sucess: false,
    category: {
        _id: "",
        name: "",
        stores: []
    },
    list: []
}
var state = { ...initialState }
export default class createCategories extends Component {

    async componentWillMount() {

        var response = await axios.get('https://g20-api-rest.herokuapp.com/category', {})
        response.data.forEach(function (category) {
            state.list.unshift(category)
        })
        this.setState(state)
        this.state = state
    }

    setName(value) {
        state.category.name = value
        state.response = '...'
        this.setState(state)
    }
    
    async delete(id) {
        console.log(id)
        var response = await axios.delete(`https://g20-api-rest.herokuapp.com/category/${id}`)
        state.sucess = response.status == 200 ? true : false
        var response = await axios.get(' https://g20-api-rest.herokuapp.com/category', {})
        state.list = []
        response.data.forEach(function (category) {
            state.list.unshift(category)
        })
        this.setState(state)
        this.state = state
    }

    async save() {
        const newObj = { ...state.category, _id: undefined }
        var response = await axios.post(' https://g20-api-rest.herokuapp.com/category', newObj)
        state.sucess = response.status == 201 ? true : false
        var response = await axios.get(' https://g20-api-rest.herokuapp.com/category', {})
        state.list = []
        response.data.forEach(function (category) {
            state.list.unshift(category)
        })
        this.setState(state)
        this.state = state
    }

    renderTable() {
        return (
            <table className="table mt-4">
                <thead>
                    <tr>
                        <th>Lojas</th>
                        <th>Nome</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {this.renderRows()}
                </tbody>
            </table>
        )
    }
    renderRows() {
        return state.list.map(category => {
            return (
               
                <tr key={category._id}>
                    <td>{category.stores.length}</td>
                    <td>{category.name}</td>
                    <td>
                        <Link className="btn btn-warning" to='/store' 
                        state = {{categoryId:category._id}} >
                            <i className="fa fa-pencil"></i>
                        </Link>
                        <button className="btn btn-danger ml-2"
                        onClick={() => { console.log(category._id)
                        if(category.name !='Pedidos'){
                            this.delete(category._id);
                        }else{
                            alert('VocÊ não pode excluir essa categoria')
                        }
                    
                          }}
                            >
                            <i className="fa fa-trash"></i>
                        </button>

                    </td>
                </tr>

            )
        })
    }
    renderForm() {
        return (
            <div className="form">
                <div className="row">
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Nova Categoria</label>
                            <input type="text" className="form-control"
                                name="name"
                                value={state.category.name}
                                onChange={e => this.setName(e.target.value)}
                                placeholder="Digite o nome da categoria..." />
                        </div>
                    </div>
                    <h1></h1>
                </div>

                <div className="row">
                    <div className="col-12 d-flex justify-content-end">
                        <button className="btn btn-primary"
                            onClick={e => this.save()}>
                            Salvar
                        </button>
                        <button className="btn btn-secondary ml-2"
                            onClick={e => this.clean()}>
                            cancelar
                        </button>
                    </div>
                </div>
                <p>{state.response}</p>
            </div>
        )
    }
    render() {
        return (
            <Main{...headerProps}>
                {this.renderForm()}
                {this.renderTable()}
            </Main>
        )
    }
}