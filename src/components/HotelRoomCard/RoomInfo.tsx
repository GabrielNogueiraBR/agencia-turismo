'use client'

import React from 'react'

import { Hotel, Room } from '@/types/hotelApi'
import { HStack, Icon, StackProps, VStack, Text } from '@chakra-ui/react'
import { MdPhone, MdOutlineLocationOn, MdOutlineKingBed, MdSingleBed } from 'react-icons/md'

interface Props extends StackProps {
  hotel: Hotel
  room: Room
}

const RoomInfo = ({ hotel, room, ...rest }: Props) => {
  return (
    <VStack align="flex-start" {...rest}>
      <HStack spacing={4}>
        <VStack align="flex-start">
          <HStack>
            <Icon as={MdPhone} fontSize="2xl" color="gray.500" />
            <Text fontSize="lg">{hotel.contactPhone}</Text>
          </HStack>
          <HStack>
            <Icon as={MdOutlineLocationOn} fontSize="2xl" color="gray.500" />
            <Text fontSize="lg" maxW="250" isTruncated>
              {hotel.address.street}
            </Text>
          </HStack>
        </VStack>
        <VStack align="flex-start">
          <HStack>
            <Icon as={MdOutlineKingBed} fontSize="2xl" color="gray.500" />
            <Text fontSize="lg">Casal: {room.doubleBed}</Text>
          </HStack>
          <HStack>
            <Icon as={MdSingleBed} fontSize="2xl" color="gray.500" />
            <Text fontSize="lg">Solteiro: {room.singleBed}</Text>
          </HStack>
        </VStack>
      </HStack>
    </VStack>
  )
}

export default RoomInfo
