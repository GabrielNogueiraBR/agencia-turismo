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

export type RoomCreateDto = {
  singleBed: number
  doubleBed: number
  number: number
  price: number
}

export type Room = {
  id: string
  singleBed: number
  doubleBed: number
  number: number
  price: number
}

export type BookingStatus = 'PENDING' | 'CONFIRMED' | 'CANCELED'

export type BookingCreateDto = {
  guests: number
  checkInDate: string
  checkoutDate: string
  status: BookingStatus
  user: string
  hotel: string
  room: string
}

export type BookingDto = {
  id: string
  guests: number
  checkInDate: string
  checkoutDate: string
  status: BookingStatus
  user: User
  hotel: Hotel
  room: Room
}
