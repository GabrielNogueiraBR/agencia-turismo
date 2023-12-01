// const mongoose = require('mongoose')
// const dotenv = require('dotenv')

import mongoose, { Mongoose } from 'mongoose'
import * as dotenv from 'dotenv'

let connection: Mongoose
let FlightModel: any
let UserModel: any

async function setup() {
  dotenv.config()
  connection = await mongoose.connect(process.env.MONGO_URL!)

  UserModel = connection.model(
    'User',
    new mongoose.Schema({
      createdAt: Date,
      updatedAt: Date,
      name: String,
      email: String,
      username: String,
      password: String,
      roles: [String],
    }),
    'users',
  )

  FlightModel = connection.model(
    'Flight',
    new mongoose.Schema({
      createdAt: Date,
      updatedAt: Date,
      airline: String,
      departureTime: Date,
      arrivalTime: Date,
      departureAirport: mongoose.Schema.Types.Mixed,
      arrivalAirport: mongoose.Schema.Types.Mixed,
      seats: [mongoose.Schema.Types.Mixed],
      layovers: [mongoose.Schema.Types.Mixed],
    }),
    'flights',
  )
}

async function seed() {
  const admUser = new UserModel({
    createdAt: new Date(),
    updatedAt: new Date(),
    name: 'Administrador',
    email: 'admin@aerozen.com',
    username: 'admin',
    password: '$2a$10$c1Ka1chBUV5zt5GqYdF7WeVKMdCGV0Z6nZRc5xc7DbpZ16tGOResi',
    roles: ['admin'],
  })

  const flight = new FlightModel({
    createdAt: new Date(),
    updatedAt: new Date(),
    airline: 'Azul Linhas Aéreas',
    departureTime: new Date('2023-11-15T13:30:00.000+00:00'),
    arrivalTime: new Date('2023-11-15T16:45:00.000+00:00'),
    departureAirport: {
      city: 'Recife',
      name: 'Recife/Guararapes International Airport',
      iataCode: 'REC',
    },
    arrivalAirport: {
      city: 'São Paulo',
      name: 'São Paulo/Guarulhos International Airport',
      iataCode: 'GUA',
    },
    layovers: [],
    seats: [
      {
        seatNumber: '1A',
        seatClass: 'seats',
        status: 'available',
        price: 150,
      },
      {
        seatNumber: '2A',
        seatClass: 'seats',
        status: 'available',
        price: 150,
      },
      {
        seatNumber: '3A',
        seatClass: 'seats',
        status: 'available',
        price: 150,
      },
    ],
  })

  await admUser.save()
  await flight.save()
}

async function bootstrap() {
  await setup()
  await seed()

  await connection.connection.close()
}

export { bootstrap }
