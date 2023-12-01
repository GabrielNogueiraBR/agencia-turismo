'use client'

import eventApi from '@/service/eventApi'
import { Event } from '@/types/eventApi'
import { TabPanel, TabPanelProps } from '@chakra-ui/react'
import { useQuery } from '@tanstack/react-query'
import React from 'react'

interface Props extends TabPanelProps {}

const EventPanel = ({ ...rest }: Props) => {
  const {
    isPending,
    error,
    data: events,
  } = useQuery<Event[]>({
    queryKey: ['eventsList'],
    queryFn: () => eventApi.get('/events').then((res) => res.data.content),
  })

  return (
    <TabPanel display="flex" flexDirection="column" pt="8" p="6" gap="4" w="100%" {...rest}>
      {events?.map((event) => event.name)}
    </TabPanel>
  )
}

export default EventPanel
