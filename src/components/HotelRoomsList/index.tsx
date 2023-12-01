'use client'

import React from 'react'

import { Hotel, Room } from '@/types/hotelApi'
import { Flex, FlexProps, Heading, Image, VStack } from '@chakra-ui/react'
import { useQuery } from '@tanstack/react-query'
import hotelApi from '@/service/hotelApi'
import HotelRoomCard from '../HotelRoomCard'

interface Props extends FlexProps {
  hotel: Hotel
}

const HotelRoomsList = ({ hotel, ...rest }: Props) => {
  const {
    isPending,
    error,
    data: rooms,
  } = useQuery<Room[]>({
    queryKey: ['roomsList'],
    queryFn: () => hotelApi.get(`/hotels/${hotel.id}/rooms`).then((res) => res.data.records),
  })

  return (
    <VStack spacing="4">
      {rooms?.map((room) => <HotelRoomCard key={room.id} hotel={hotel} room={room} />)}
    </VStack>
  )
}

export default HotelRoomsList
