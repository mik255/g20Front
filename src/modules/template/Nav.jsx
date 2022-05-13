import './Nav.css'
import React from 'react'
import 'font-awesome/css/font-awesome.min.css'
import Logo from './Logo'

export default props =>
<aside className="menu-area">
   <nav className='menu'>
    {/* <Logo /> */}
    <div className='profileHeader'>
    <img src="https://www.w3schools.com/howto/img_avatar.png" alt="Avatar" class="avatar"/>
        <h1>Adm g20</h1>
        <p>Adm20Apptech@gmail.com</p>
    </div>
    <hr className="solid"></hr>
    <h1>Home</h1>
    
    <a href="/orders">
        <i className = "fa fa-pie-chart"></i> Pedidos
    </a>

    <a href="/">
        <i className = "fa fa-pie-chart"></i> DashBoard
    </a>
    
    <hr className="solid"></hr>
   <h1>Cadastro</h1>
    

    <a href="/categories">
        
        <i className='fa fa-shopping-bag'></i> Categorias
    </a>
    <a href="/store">
        <i className='fa fa-shopping-basket'></i> Lojas
    </a>
    <a href="/users">
        <i className='fa fa-users'></i> usuários
    </a>
   </nav>
</aside>