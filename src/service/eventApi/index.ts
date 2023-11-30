import { EVENT_API_URL } from '@/constant/config'
import axios from 'axios'

const eventApi = axios.create({
  baseURL: EVENT_API_URL,
})

export default eventApi
