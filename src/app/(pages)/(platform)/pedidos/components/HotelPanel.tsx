'use client'

import CustomDataTable from '@/components/CustomDataTable'
import LoadingPage from '@/components/LoadingPage'
import hotelApi from '@/service/hotelApi'
import { BookingDto } from '@/types/hotelApi'
import { TabPanel, TabPanelProps } from '@chakra-ui/react'
import { useQuery } from '@tanstack/react-query'
import React from 'react'

interface Props extends TabPanelProps {}

const HotelPanel = ({ ...rest }: Props) => {
  const { isLoading, data: bookings } = useQuery<BookingDto[]>({
    queryKey: ['bookingsList'],
    queryFn: () => hotelApi.get('/bookings').then((res) => res.data.records),
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
              name: 'ID',
              center: true,
              selector: (row) => row.id,
              wrap: true,
            },
            {
              id: 'checkIn',
              name: 'Check-in',
              selector: (row) => row.checkInDate,
              sortable: true,
              wrap: true,
              format: (row) =>
                new Intl.DateTimeFormat('pt-BR', {
                  timeZone: 'UTC',
                  month: 'long',
                  year: 'numeric',
                  day: '2-digit',
                }).format(new Date(row.checkInDate)),
            },
            {
              id: 'checkOut',
              name: 'Check-out',
              selector: (row) => row.checkoutDate,
              sortable: true,
              wrap: true,
              format: (row) =>
                new Intl.DateTimeFormat('pt-BR', {
                  timeZone: 'UTC',
                  month: 'long',
                  year: 'numeric',
                  day: '2-digit',
                }).format(new Date(row.checkoutDate)),
            },
            {
              name: 'Status',
              center: true,
              selector: (row) => row.status,
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

export default HotelPanel
