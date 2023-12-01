'use client'

import React from 'react'
import { Flex, Heading } from '@chakra-ui/react'

const LayoutClientElement = ({ children }: { children: React.ReactNode }) => {
  return (
    <Flex
      flex="1"
      maxW="100vw"
      maxH="100%"
      overflowY={{ base: 'auto', md: 'hidden' }}
      direction={{ base: 'column', md: 'row' }}
    >
      {children}
    </Flex>
  )
}

export default LayoutClientElement
