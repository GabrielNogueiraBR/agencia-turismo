'use client'

import React from 'react'
import { Tabs, TabList, Tab, TabPanels, TabPanel, Flex } from '@chakra-ui/react'
import { useQuery } from '@tanstack/react-query'
import hotelApi from '@/service/hotelApi'
import { Hotel } from '@/types/hotelApi'

const ClientElement = () => {
  const {
    isPending,
    error,
    data: hotels,
  } = useQuery<Hotel[]>({
    queryKey: ['hotelsList'],
    queryFn: () => hotelApi.get('/hotels').then((res) => res.data.records),
  })

  return (
    <Flex w="90%" maxW="100%" rounded="xl" bg="white" shadow="sm" overflow="hidden">
      <Tabs size="md" w="100%" variant="line">
        <TabList
          w="100%"
          display="flex"
          flexDirection="row"
          bg="white"
          border="2px solid"
          borderColor="gray.300"
          roundedTop="xl"
          overflow="hidden"
          sx={{
            button: {
              _selected: { color: 'white', bg: 'blue.400', borderColor: 'blue.400' },
              _active: { bg: 'transparent' },
              _hover: { color: 'white', bg: 'blue.400', transform: 'scale(1)' },
              py: 3,
              fontWeight: 600,
            },
          }}
        >
          <Tab>Todos</Tab>
          <Tab>Reserva de Hotel</Tab>
          <Tab>Vôos</Tab>
          <Tab>Ingressos</Tab>
        </TabList>
        <TabPanels
          w="100%"
          bg="white"
          roundedBottom="xl"
          border="2px solid"
          borderColor="gray.200"
          borderTop="0"
        >
          <TabPanel>Um</TabPanel>
          <TabPanel>Dois</TabPanel>
          <TabPanel>Três</TabPanel>
          <TabPanel>Quatro</TabPanel>
        </TabPanels>
      </Tabs>
    </Flex>
  )
}

export default ClientElement
