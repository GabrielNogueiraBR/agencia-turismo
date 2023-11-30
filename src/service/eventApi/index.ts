import { EVENT_API_URL } from '@/constant/config'
import axios from 'axios'

const eventApi = axios.create({
  baseURL: EVENT_API_URL,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
  },
})

export default eventApi
