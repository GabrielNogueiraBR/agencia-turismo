'use client'

import React, { useState } from 'react'

import CustomDataTable from '@/components/CustomDataTable'
import LoadingPage from '@/components/LoadingPage'
import hotelApi from '@/service/hotelApi'
import { BookingDto } from '@/types/hotelApi'
import { Button, Icon, TabPanel, TabPanelProps, Tooltip, useToast } from '@chakra-ui/react'
import { useQuery } from '@tanstack/react-query'
import { GoTrash } from 'react-icons/go'

interface Props extends TabPanelProps {}

const HotelPanel = ({ ...rest }: Props) => {
  const [isCancelling, setIsCancelling] = useState<boolean>(false)

  const toast = useToast()

  const {
    isLoading,
    data: bookings,
    refetch,
  } = useQuery<BookingDto[]>({
    queryKey: ['bookingsList'],
    queryFn: () => hotelApi.get('/bookings').then((res) => res.data.records),
  })

  const cancelBooking = async (bookingId: string) => {
    try {
      if (isCancelling) return
      setIsCancelling(true)

      await hotelApi.delete(`/bookings/${bookingId}`)

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
                      onClick={() => cancelBooking(row.id)}
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

export default HotelPanel
