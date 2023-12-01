'use client'

import React, { useMemo } from 'react'

import { HStack, StackProps, Text, Heading, Divider } from '@chakra-ui/react'
import { FlightPresenter, SeatPresenter } from '@/types/flightApi'

interface Props extends StackProps {
  flight: FlightPresenter
  seat: SeatPresenter
}

const FlightHeader = ({ flight, seat, ...rest }: Props) => {
  const departureTime = useMemo(
    () =>
      new Intl.DateTimeFormat('pt-BR', { timeZone: 'UTC' }).format(new Date(flight.departureTime)),
    [flight],
  )

  return (
    <HStack justify="flex-start" align="flex-end">
      <Heading fontSize="2xl">{flight.airline}</Heading>
      <Divider orientation="vertical" borderWidth="1px" rounded="full" borderColor="gray.900" />
      <Text fontSize="xl" color="gray.500">
        {seat.seatClass}
      </Text>
    </HStack>
  )
}

export default FlightHeader
