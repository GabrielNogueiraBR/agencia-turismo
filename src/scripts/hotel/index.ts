import {
  Hotel,
  HotelCreateDto,
  Room,
  RoomCreateDto,
  User,
  UserCreateDto,
} from '../../types/hotelApi'
import { HOTEL_API_URL } from '../../constant/config'
import axios from 'axios'

const createUser = async () => {
  const payload: UserCreateDto = {
    name: 'Fulano de Tal',
    email: 'fulanodetal@gmail.com.br',
    taxId: '11232010313',
    phone: '82986799665',
    birthdate: '1951-10-17T14:48:00.000Z',
  }

  const response = await axios.post<User>(`${HOTEL_API_URL}/users`, payload)
  const data = response.data as User
  return data
}

const createHotel = async () => {
  const payload: HotelCreateDto = {
    name: 'Hotel Le Palácio',
    contactPhone: '11999999999',
    rating: 'ECONOMICAL',
    address: {
      street: 'Rodovia Senador José Ermírio de Moraes',
      number: 1425,
      district: 'Alto da Boa Vista',
      city: 'Sorocaba',
      state: 'São Paulo',
      zipcode: '18087125',
    },
  }

  const response = await axios.post<Hotel>(`${HOTEL_API_URL}/hotels`, payload)
  const data = response.data
  return data
}

const createRoom = async ({
  hotelId,
  singleBed = 1,
  doubleBed = 2,
  number = 1,
  price = 124.99,
}: { hotelId: string } & Partial<RoomCreateDto>) => {
  const payload: RoomCreateDto = {
    singleBed,
    doubleBed,
    number,
    price,
  }

  const response = await axios.post<Room>(`${HOTEL_API_URL}/hotels/${hotelId}/rooms`, payload)
  const data = response.data
  return data
}

const setupHotelApi = async () => {
  const user = await createUser()
  const hotel = await createHotel()

  const room1 = await createRoom({ hotelId: hotel.id, number: 1 })
  const room2 = await createRoom({ hotelId: hotel.id, number: 2 })
  const room3 = await createRoom({ hotelId: hotel.id, number: 3 })
}

export { setupHotelApi }
