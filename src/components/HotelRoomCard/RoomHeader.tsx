'use client'

import React from 'react'

import { Hotel, Room } from '@/types/hotelApi'
import { HStack, StackProps, Text, Heading, Divider } from '@chakra-ui/react'

interface Props extends StackProps {
  hotel: Hotel
  room: Room
}

const RoomHeader = ({ hotel, room, ...rest }: Props) => {
  return (
    <HStack justify="flex-start" align="flex-end">
      <Heading fontSize="2xl">{hotel.name}</Heading>
      <Divider orientation="vertical" borderWidth="1px" rounded="full" borderColor="gray.900" />
      <Text fontSize="xl" color="gray.500">
        Quarto {room.number}
      </Text>
    </HStack>
  )
}

export default RoomHeader
