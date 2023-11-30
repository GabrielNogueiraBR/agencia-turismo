import { Hotel, HotelCreateDto, User, UserCreateDto } from '../../types/hotelApi'
import { HOTEL_API_URL } from '../../constant/config'
import axios from 'axios'

const createUser = async () => {
  const payload: UserCreateDto = {
    name: 'Fulano de Tal',
    email: 'fulanodetal@gmail.com.br',
    taxId: '11252010313',
    phone: '82986799665',
    birthdate: '1951-10-17T14:48:00.000Z',
  }

  const response = await axios.post<User>(`${HOTEL_API_URL}/users`, payload)
  const data = response.data as User
  return data
}

const createHotel = async () => {
  const payload: HotelCreateDto = {
    name: 'Hotel name',
    contactPhone: '11999999999',
    rating: 'ECONOMICAL',
    address: {
      street: 'Rodovia Senador José Ermírio de Moraes - Castelinho km 1,5',
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

const setupHotelApi = async () => {
  const user = await createUser()
  const hotel = await createHotel()

  console.log({ hotel })
}

export { setupHotelApi }
