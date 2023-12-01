'use client'

import React, { useMemo } from 'react'

import { HStack, Icon, StackProps, VStack, Text } from '@chakra-ui/react'
import {
  MdOutlineFlightTakeoff,
  MdOutlineFlightLand,
  MdCalendarMonth,
} from 'react-icons/md'
import { FlightPresenter, SeatPresenter } from '@/types/flightApi'

interface Props extends StackProps {
  flight: FlightPresenter
  seat: SeatPresenter
}

const FlightInfo = ({ flight, seat, ...rest }: Props) => {
  const departureTime = useMemo(
    () =>
      new Intl.DateTimeFormat('pt-BR', { dateStyle: 'full', timeZone: 'UTC' }).format(
        new Date(flight.departureTime),
      ),
    [flight],
  )

  const arrivalTime = useMemo(
    () =>
      new Intl.DateTimeFormat('pt-BR', { dateStyle: 'full', timeZone: 'UTC' }).format(
        new Date(flight.arrivalTime),
      ),
    [flight],
  )

  return (
    <VStack align="flex-start" {...rest}>
      <HStack spacing={4}>
        <VStack align="flex-start">
          <HStack>
            <Icon as={MdOutlineFlightTakeoff} fontSize="2xl" color="gray.500" />
            <Text fontSize="lg" maxW="350" isTruncated>
              {flight.departureAirport.name}
            </Text>
          </HStack>
          <HStack>
            <Icon as={MdOutlineFlightLand} fontSize="2xl" color="gray.500" />
            <Text fontSize="lg" maxW="350" isTruncated>
              {flight.arrivalAirport.name}
            </Text>
          </HStack>
        </VStack>
        <VStack align="flex-start">
          <HStack>
            <Icon as={MdCalendarMonth} fontSize="2xl" color="gray.500" />
            <Text fontSize="lg" fontWeight={600}>
              Ida:{' '}
              <Text as="span" fontWeight={400}>
                {departureTime}
              </Text>
            </Text>
          </HStack>
          <HStack>
            <Icon as={MdCalendarMonth} fontSize="2xl" color="gray.500" />
            <Text fontSize="lg" fontWeight={600}>
              Chegada:{' '}
              <Text as="span" fontWeight={400}>
                {arrivalTime}
              </Text>
            </Text>
          </HStack>
        </VStack>
      </HStack>
    </VStack>
  )
}

export default FlightInfo
