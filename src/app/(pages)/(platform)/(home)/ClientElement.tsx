'use client'

import React from 'react'
import { Tabs, TabList, Tab, TabPanels, Flex } from '@chakra-ui/react'
import HotelPanel from './components/HotelPanel'
import FlightPanel from './components/FlightPanel'
import EventPanel from './components/EventPanel'
import Header from '@/components/Header'

const ClientElement = () => {
  return (
    <>
      <Header />
      <Flex w="90%" maxW="100%" rounded="xl" bg="white" shadow="sm" overflow="hidden">
        <Tabs size="md" h="100%" w="100%" variant="line">
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
            <Tab>Hotels</Tab>
            <Tab>Vôos</Tab>
            <Tab>Eventos</Tab>
          </TabList>
          <TabPanels
            w="100%"
            bg="white"
            roundedBottom="xl"
            border="2px solid"
            borderColor="gray.200"
            borderTop="0"
          >
            <HotelPanel />
            <FlightPanel />
            <EventPanel />
          </TabPanels>
        </Tabs>
      </Flex>
    </>
  )
}

export default ClientElement
