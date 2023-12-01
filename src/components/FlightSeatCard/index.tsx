'use client'

import React, { useMemo } from 'react'

import { Flex, FlexProps, Image, VStack, Text, Spacer, Button, Badge } from '@chakra-ui/react'

import { FlightPresenter, SeatPresenter } from '@/types/flightApi'
import FlightHeader from './FlightHeader'
import FlightInfo from './FlightInfo'

interface FormValues {
  checkIn: string
  checkOut: string
}

interface Props extends FlexProps {
  flight: FlightPresenter
  seat: SeatPresenter
}

const FlightSeatCard = ({ flight, seat, ...rest }: Props) => {
  const priceFormatted = useMemo(
    () => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(seat.price),
    [seat],
  )

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
          <FlightHeader flight={flight} seat={seat} />
          <Badge fontSize="md" rounded="full" px="4" bg="green.400" color="white">
            {seat.seatNumber}
          </Badge>
          <Spacer />
          <FlightInfo flight={flight} seat={seat} />
        </VStack>
        <Spacer />

        <VStack align="center" justify="center" px="8">
          <Text fontSize="4xl" fontWeight={600} color="gray.700">
            {priceFormatted}
          </Text>
          <Button w="100%" px="12" size="lg" fontSize="xl" colorScheme="green">
            Comprar
          </Button>
        </VStack>
      </Flex>
    </Flex>
  )
}

export default FlightSeatCard
