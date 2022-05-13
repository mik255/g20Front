import React from "react"
import { Routes, Route } from "react-router-dom"
import Home from '../modules/home/Home'
import UserCrud from '../modules/user/UserCrud'
import CreateCategories from '../modules/categories/CreateCategories'
import CreateStore from '../modules/stores/stores'
import Sobre from '../modules/sobre/Sobre'
import ProductProvider from "../modules/products/productProvider"
import Orders from "../modules/order/orderPage"
import StoreProvider from "../modules/stores/storeProvider"
export default props =>
    <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/users" element={<UserCrud />} />
        <Route path="/categories" element={<CreateCategories />} />
        <Route path="/store" element={<StoreProvider />} />
        <Route path="/products" element={<ProductProvider />} />
        <Route path="/orders" element={<Orders/>} />
        <Route path="/sobre" element={<Sobre />} />
        <Route path="*" element={<Home />} />
    </Routes>