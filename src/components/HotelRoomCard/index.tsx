'use client'

import React, { useMemo } from 'react'

import { Hotel, Room } from '@/types/hotelApi'
import {
  Divider,
  Flex,
  FlexProps,
  HStack,
  Heading,
  Image,
  VStack,
  Text,
  Badge,
  Spacer,
  Icon,
  Center,
  FormControl,
  FormLabel,
  Input,
  Button,
} from '@chakra-ui/react'
import { useQuery } from '@tanstack/react-query'
import hotelApi from '@/service/hotelApi'

import { MdOutlineKingBed, MdOutlineLocationOn, MdPhone, MdSingleBed } from 'react-icons/md'
import RoomInfo from './RoomInfo'
import RoomHeader from './RoomHeader'
import { useForm } from 'react-hook-form'

interface FormValues {
  checkIn: Date
  checkOut: Date
}

interface Props extends FlexProps {
  hotel: Hotel
  room: Room
}

const HotelRoomCard = ({ hotel, room, ...rest }: Props) => {
  const reservationDays = 1

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<FormValues>()

  const priceFormatted = useMemo(
    () =>
      new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(
        room.price * reservationDays,
      ),
    [reservationDays, room],
  )

  const onSubmit = async (data: FormValues) => {
    try {
      console.log(data)
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <Flex w="100%" shadow="md" border="1px solid" borderColor="gray.200" gap="4" {...rest}>
      <Image
        w={{ base: '100%', sm: '8rem', md: '12rem', lg: '14rem' }}
        src="https://via.placeholder.com/250"
        fit="cover"
        loading="lazy"
        alt="Hotel image"
      />
      <Flex flex="1" direction="row" p="4" gap="4">
        <VStack align="flex-start">
          <RoomHeader hotel={hotel} room={room} />
          <Badge fontSize="md" rounded="full" px="4" bg="green.400" color="white">
            {hotel.rating}
          </Badge>
          <Spacer />
          <RoomInfo hotel={hotel} room={room} />
        </VStack>
        <Spacer />
        <VStack w="24rem" align="center" justify="center" spacing="2">
          <FormControl isDisabled={isSubmitting} isInvalid={!!errors.checkIn}>
            <FormLabel>Check-in</FormLabel>
            <Input type="date" {...register('checkIn', { required: true })} />
          </FormControl>
          <FormControl isDisabled={isSubmitting} isInvalid={!!errors.checkOut}>
            <FormLabel>Check-out</FormLabel>
            <Input type="date" {...register('checkOut', { required: true })} />
          </FormControl>
        </VStack>
        <VStack align="center" justify="center" px="8">
          <Text fontSize="4xl" fontWeight={600} color="gray.700">
            {priceFormatted}
          </Text>
          <Button
            w="100%"
            px="12"
            size="lg"
            fontSize="xl"
            colorScheme="green"
            onClick={handleSubmit(onSubmit)}
          >
            Comprar
          </Button>
        </VStack>
      </Flex>
    </Flex>
  )
}

export default HotelRoomCard
