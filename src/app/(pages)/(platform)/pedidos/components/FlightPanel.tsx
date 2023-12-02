'use client'

import React, { useState } from 'react'

import CustomDataTable from '@/components/CustomDataTable'
import LoadingPage from '@/components/LoadingPage'
import { useAuth } from '@/context/AuthContext'
import flightApi from '@/service/flightApi'
import { ReservationPresenter } from '@/types/flightApi'
import { Button, TabPanel, TabPanelProps, Tooltip, Icon, useToast } from '@chakra-ui/react'
import { useQuery } from '@tanstack/react-query'
import { GoTrash } from 'react-icons/go'

interface Props extends TabPanelProps {}

const FlightPanel = ({ ...rest }: Props) => {
  const [isCancelling, setIsCancelling] = useState<boolean>(false)

  const toast = useToast()
  const { token } = useAuth()

  const {
    isLoading,
    refetch,
    data: bookings,
  } = useQuery<ReservationPresenter[]>({
    queryKey: ['reservationsList'],
    queryFn: () =>
      flightApi
        .get('/users/me/reservations', { headers: { Authorization: `Bearer ${token}` } })
        .then((res) => res.data),
  })

  const cancelReservation = async (reservationId: string) => {
    try {
      if (isCancelling) return
      setIsCancelling(true)

      await flightApi.delete(`/reservations/${reservationId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })

      toast({
        title: 'Reserva cancelada com sucesso!',
        status: 'success',
        duration: 5000,
        isClosable: true,
      })
      await refetch()
    } catch (e) {
      console.error(e)
      toast({
        title: 'Erro no cancelamento da reserva',
        description: e instanceof Error ? e.message : 'Ops, tente novamente.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
    } finally {
      setIsCancelling(false)
    }
  }

  return (
    <TabPanel
      display="flex"
      flexDirection="column"
      p="0"
      gap="4"
      w="100%"
      overflow="hidden"
      {...rest}
    >
      {!bookings && <LoadingPage />}
      {bookings && (
        <CustomDataTable
          defaultSortFieldId="date"
          defaultSortAsc={false}
          columns={[
            {
              name: 'Cidade origem',
              center: true,
              sortable: true,
              selector: (row) => row.flight.departureAirport.city,
              wrap: true,
            },
            {
              name: 'Cidade destino',
              center: true,
              sortable: true,
              selector: (row) => row.flight.arrivalAirport.city,
              wrap: true,
            },
            {
              id: 'departure',
              name: 'Partida',
              center: true,
              selector: (row) => row.flight.departureTime,
              sortable: true,
              wrap: true,
              format: (row) =>
                new Intl.DateTimeFormat('pt-BR', {
                  timeZone: 'UTC',
                  month: 'long',
                  year: 'numeric',
                  day: '2-digit',
                }).format(new Date(row.flight.departureTime)),
            },
            {
              id: 'arrival',
              name: 'Chegada',
              center: true,
              selector: (row) => row.flight.arrivalTime,
              sortable: true,
              wrap: true,
              format: (row) =>
                new Intl.DateTimeFormat('pt-BR', {
                  timeZone: 'UTC',
                  month: 'long',
                  year: 'numeric',
                  day: '2-digit',
                }).format(new Date(row.flight.arrivalTime)),
            },
            {
              name: 'Assento',
              center: true,
              selector: (row) => row.seatNumber,
              sortable: true,
              wrap: true,
            },
            {
              name: 'Ação',
              center: true,
              selector: (row) => row.id,
              sortable: true,
              wrap: true,
              cell: (row) => {
                return (
                  <Tooltip label="Cancelar reserva" placement="top" hasArrow>
                    <Button
                      colorScheme="none"
                      p={0}
                      m={0}
                      w="fit-content"
                      h="fit-content"
                      minW={0}
                      minH={0}
                      aspectRatio={1}
                      onClick={() => cancelReservation(row.id)}
                      isLoading={isCancelling}
                    >
                      <Icon as={GoTrash} bg="transparent" color="red" rounded="md" fontSize="2xl" />
                    </Button>
                  </Tooltip>
                )
              },
            },
          ]}
          data={bookings}
          progressPending={isLoading}
        />
      )}
    </TabPanel>
  )
}

export default FlightPanel
