import axios from 'axios'
const baseUrl = 'https://puhelinluettelohenriw.herokuapp.com/api/persons'

const GetAll = () => {
    return axios.get(baseUrl)
}

const Create = (newObject) => {
    return axios.post(baseUrl, newObject)
}

const Delete = (id) => {
    return axios.delete(`https://puhelinluettelohenriw.herokuapp.com/api/persons/${id}`)
}

const Update = (id, newObject) => {
    return axios.put(`https://puhelinluettelohenriw.herokuapp.com/api/persons/${id}`, newObject)
}

export default {GetAll, Create, Delete, Update}