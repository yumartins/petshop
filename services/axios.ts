import axios from 'axios'

const api = axios.create({
  baseURL: 'https://petshop-ppi.herokuapp.com/api'
})

export default api
