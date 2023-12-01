'use client'

import flightApi from '@/service/flightApi'
import { FlightPresenter } from '@/types/flightApi'
import { TabPanel, TabPanelProps } from '@chakra-ui/react'
import { useQuery } from '@tanstack/react-query'
import React from 'react'

interface Props extends TabPanelProps {}

const FlightPanel = ({ ...rest }: Props) => {
  const {
    isPending,
    error,
    data: flights,
  } = useQuery<FlightPresenter[]>({
    queryKey: ['flightsList'],
    queryFn: () => flightApi.get('/flights').then((res) => res.data.records),
  })

  return (
    <TabPanel display="flex" flexDirection="column" pt="8" p="6" gap="4" w="100%" {...rest}>
      {flights?.map((flight) => flight.airline)}
    </TabPanel>
  )
}

export default FlightPanel
