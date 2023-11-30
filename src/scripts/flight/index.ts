import axios from 'axios'
import {
  AuthDto,
  CreateFlightDto,
  CreateUserDto,
  FlightPresenter,
  TokenPresenter,
  UserPresenter,
} from '../../types/flightApi'
import { FLIGHT_API_URL } from '../../constant/config'

const api = axios.create({ baseURL: FLIGHT_API_URL })

const createUser = async ({
  name = 'Fulano de Tal',
  email = 'fulanodetal@gmail.com.br',
  username = 'fulanodetal',
  password = 'fulano123',
}: Partial<CreateUserDto>) => {
  const payload: CreateUserDto = {
    name,
    email,
    username,
    password,
  }

  const response = await api.post<UserPresenter>('/users', payload)
  const data = response.data
  return data
}

const authUser = async (username = 'fulanodetal', password = 'fulano123') => {
  const payload: AuthDto = {
    username,
    password,
  }

  const response = await api.post<TokenPresenter>('/auth/login', payload)
  const data = response.data
  return data
}

const createFlight = async (token: string) => {
  const payload: CreateFlightDto = {
    airline: 'Azul Linhas Aéreas',
    departureTime: '2023-11-15T10:30:00.000Z',
    arrivalTime: '2023-11-15T13:45:00.000Z',
    departureAirport: {
      city: 'Recife',
      name: 'Recife/Guararapes International Airport',
      iataCode: 'REC',
    },
    arrivalAirport: {
      city: 'Recife',
      name: 'Recife/Guararapes International Airport',
      iataCode: 'REC',
    },
    layovers: [
      {
        airport: {
          city: 'Recife',
          name: 'Recife/Guararapes International Airport',
          iataCode: 'REC',
        },
        time: 7200000,
      },
    ],
  }

  const config = { headers: { Authorization: `Bearer ${token}` } }
  const response = await api.post<FlightPresenter>('/flights', payload, config)
  const data = response.data
  return data
}

const setupFlightApi = async () => {
  const user = await createUser({})

  // const login = await authUser('admin', '123456')
  // const flight1 = await createFlight(login.token)

  // console.log({ flight1 })
}

export { setupFlightApi }
