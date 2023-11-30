import { FLIGHT_API_URL } from '@/constant/config'
import axios from 'axios'

const flightApi = axios.create({
  baseURL: FLIGHT_API_URL,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
  },
})

export default flightApi
