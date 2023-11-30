import axios from 'axios'

const hotelApi = axios.create({
  baseURL: 'https://localhost:8080',
})

export default hotelApi
