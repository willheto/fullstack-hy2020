import axios from 'axios'

const GetAll = () => {
    return axios.get('http://localhost:3001/persons')
}

const Create = (newObject) => {
    return axios.post('http://localhost:3001/persons', newObject)
}

const Delete = (id) => {
    return axios.delete(`http://localhost:3001/persons/${id}`)
}

export default {GetAll, Create, Delete}