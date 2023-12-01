'use client'

import HotelRoomsList from '@/components/HotelRoomsList'
import hotelApi from '@/service/hotelApi'
import { Hotel } from '@/types/hotelApi'
import { TabPanel, TabPanelProps } from '@chakra-ui/react'
import { useQuery } from '@tanstack/react-query'
import React from 'react'

interface Props extends TabPanelProps {}

const HotelPanel = ({ ...rest }: Props) => {
  const {
    isPending,
    error,
    data: hotels,
  } = useQuery<Hotel[]>({
    queryKey: ['hotelsList'],
    queryFn: () => hotelApi.get('/hotels').then((res) => res.data.records),
  })

  return (
    <TabPanel display="flex" flexDirection="column" pt="8" p="6" gap="4" w="100%" {...rest}>
      {hotels?.map((hotel) => <HotelRoomsList key={hotel.id} hotel={hotel} />)}
    </TabPanel>
  )
}

export default HotelPanel
