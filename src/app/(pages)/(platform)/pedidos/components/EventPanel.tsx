'use client'

import React from 'react'

import CustomDataTable from '@/components/CustomDataTable'
import { TabPanel, TabPanelProps } from '@chakra-ui/react'

interface Props extends TabPanelProps {}

const EventPanel = ({ ...rest }: Props) => {
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
      <CustomDataTable
        defaultSortFieldId="date"
        defaultSortAsc={false}
        columns={[]}
        data={[]}
        progressPending={false}
      />
    </TabPanel>
  )
}

export default EventPanel
