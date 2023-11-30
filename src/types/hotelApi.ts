export type UserCreateDto = {
  name: string
  email: string
  taxId: string
  phone: string
  birthdate: string
}

export type User = {
  id: string
  name: string
  email: string
  taxId: string
  phone: string
  birthdate: string
}

export type HotelRating = 'CHEAP' | 'ECONOMICAL' | 'LUXURY'

export type HotelCreateDto = {
  name: string
  contactPhone: string
  rating: HotelRating
  address: {
    street: string
    number: number
    district: string
    city: string
    state: string
    zipcode: string
  }
}

export type Hotel = {
  id: string
  name: string
  contactPhone: string
  rating: HotelRating
  address: {
    id: string
    street: string
    number: number
    district: string
    city: string
    state: string
    zipcode: string
  }
}
