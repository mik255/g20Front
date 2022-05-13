import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import Routes from '../routes/Routes'
import Nav from '../modules/template/Nav'
import Header from '../modules/template/Header'
export default props =>
<BrowserRouter>
<div className="app">
    <Header></Header>
    <Nav />
    <Routes props ={props}/>
</div>
</BrowserRouter>