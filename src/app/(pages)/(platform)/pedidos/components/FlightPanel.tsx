'use client'

import CustomDataTable from '@/components/CustomDataTable'
import LoadingPage from '@/components/LoadingPage'
import { useAuth } from '@/context/AuthContext'
import flightApi from '@/service/flightApi'
import { ReservationPresenter } from '@/types/flightApi'
import { TabPanel, TabPanelProps } from '@chakra-ui/react'
import { useQuery } from '@tanstack/react-query'
import React from 'react'

interface Props extends TabPanelProps {}

const FlightPanel = ({ ...rest }: Props) => {
  const { token } = useAuth()

  const { isLoading, data: bookings } = useQuery<ReservationPresenter[]>({
    queryKey: ['reservationsList'],
    queryFn: () =>
      flightApi
        .get('/users/me/reservations', { headers: { Authorization: `Bearer ${token}` } })
        .then((res) => res.data),
  })

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
          ]}
          data={bookings}
          progressPending={isLoading}
        />
      )}
    </TabPanel>
  )
}

export default FlightPanel
