'use client'

import React from 'react'

import { Hotel, Room } from '@/types/hotelApi'
import { Flex, FlexProps, Heading, Image, VStack } from '@chakra-ui/react'
import { useQuery } from '@tanstack/react-query'
import hotelApi from '@/service/hotelApi'
import HotelRoomCard from '../HotelRoomCard'
import { FlightPresenter, SeatPresenter } from '@/types/flightApi'
import flightApi from '@/service/flightApi'
import FlightSeatCard from '../FlightSeatCard'

interface Props extends FlexProps {
  flight: FlightPresenter
}

const FlightSeats = ({ flight, ...rest }: Props) => {
  const {
    isPending,
    error,
    data: seats,
    refetch,
  } = useQuery<SeatPresenter[]>({
    queryKey: ['seatsList'],
    queryFn: () => flightApi.get(`/flights/${flight.id}/seats/available`).then((res) => res.data),
  })

  return (
    <VStack spacing="4">
      {seats?.map((seat) => (
        <FlightSeatCard key={seat.seatNumber} flight={flight} seat={seat} onSubmit={refetch} />
      ))}
    </VStack>
  )
}

export default FlightSeats
