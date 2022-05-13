import endpoints from "../../shared/endpoints"
import user from "./models/user"
import axios from "axios"
import { builtinModules } from "module"

const initialState = {
    user:user,
    list:[]
}
const state = {...initialState}

const fetchAllUsers = async() =>{
    const list =[]
    const response = await axios(endpoints.base)
    state = {list}
    return state
}
module.exports = fetchAllUsers

