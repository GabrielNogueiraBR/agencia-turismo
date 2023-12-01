export type CreateUserDto = {
  name: string
  email: string
  username: string
  password: string
}

export type UserPresenter = {
  id: string
  name: string
  email: string
  username: string
  permissions: string[]
  createdAt: string
  updatedAt: string
}

export type AuthDto = {
  username: string
  password: string
}

export type TokenPresenter = {
  token: string
  expiresIn: string
}

export type CreateAirportDto = {
  city: string
  name: string
  iataCode: string
}

export type CreateLayoverDto = {
  airport: CreateAirportDto
  time: number
}

export type CreateFlightDto = {
  airline: string
  departureTime: string
  arrivalTime: string
  departureAirport: CreateAirportDto
  arrivalAirport: CreateAirportDto
  layovers: CreateLayoverDto[]
}

export type FlightPresenter = {
  id: string
  createdAt: string
  updatedAt: string
  airline: string
  departureTime: string
  arrivalTime: string
  departureAirport: {
    city: string
    name: string
    iataCode: string
  }
  arrivalAirport: {
    city: string
    name: string
    iataCode: string
  }
  layovers: [
    {
      airport: {
        city: string
        name: string
        iataCode: string
      }
      time: number
    },
  ]
}

export type SeatPresenter = {
  seatNumber: string
  seatClass: string
  price: number
}
