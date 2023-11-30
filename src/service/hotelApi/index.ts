import { HOTEL_API_URL } from '@/constant/config'
import axios from 'axios'

const hotelApi = axios.create({
  baseURL: HOTEL_API_URL,
})

export default hotelApi
