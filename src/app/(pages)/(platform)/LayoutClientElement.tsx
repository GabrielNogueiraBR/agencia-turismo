'use client'

import React from 'react'
import { Flex } from '@chakra-ui/react'

const LayoutClientElement = ({ children }: { children: React.ReactNode }) => {
  return (
    <Flex flex="1" p="16" direction="column" justify="flex-start" align="center" gap="12">
      {children}
    </Flex>
  )
}

export default LayoutClientElement
