'use client'

import React, { useMemo } from 'react'

import {
  Flex,
  FlexProps,
  Image,
  VStack,
  Text,
  Spacer,
  Button,
  Badge,
  useToast,
} from '@chakra-ui/react'

import {
  CreateReservationDto,
  FlightPresenter,
  ReservationPresenter,
  SeatPresenter,
} from '@/types/flightApi'
import FlightHeader from './FlightHeader'
import FlightInfo from './FlightInfo'
import { useForm } from 'react-hook-form'
import flightApi from '@/service/flightApi'
import { useAuth } from '@/context/AuthContext'

interface FormValues {
  checkIn: string
  checkOut: string
}

interface Props extends Omit<FlexProps, 'onSubmit'> {
  flight: FlightPresenter
  seat: SeatPresenter
  onSubmit: () => void
}

const FlightSeatCard = ({ flight, seat, onSubmit: _onSubmit, ...rest }: Props) => {
  const { token } = useAuth()
  const toast = useToast()

  const {
    handleSubmit,
    formState: { isSubmitted },
  } = useForm()

  const priceFormatted = useMemo(
    () => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(seat.price),
    [seat],
  )

  const onSubmit = async () => {
    try {
      if (!token) return
      const payload: CreateReservationDto = {
        seatNumber: seat.seatNumber,
      }

      const config = { headers: { Authorization: `Bearer ${token}` } }
      await flightApi.put<ReservationPresenter>(`/flights/${flight.id}/reserve`, payload, config)

      toast({
        title: 'Reserva criada!',
        description: 'Sua reserva foi criada com sucesso.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      })
      if (_onSubmit) _onSubmit()
    } catch (e) {
      console.error(e)
      toast({
        title: 'Erro na criação da reserva',
        description: e instanceof Error ? e.message : 'Ops, tente novamente.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
    }
  }

  return (
    <Flex
      w="100%"
      roundedTopLeft="2rem"
      roundedBottomLeft="2rem"
      shadow="lg"
      border="1px solid"
      borderColor="gray.200"
      gap="4"
      {...rest}
    >
      <Image
        w={{ base: '100%', sm: '8rem', md: '12rem', lg: '14rem' }}
        src="/assets/flight.svg"
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

export default FlightSeatCard
