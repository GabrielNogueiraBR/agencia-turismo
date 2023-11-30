import { FLIGHT_API_URL } from '@/constant/config'
import axios from 'axios'

const flightApi = axios.create({
  baseURL: FLIGHT_API_URL,
})

export default flightApi
