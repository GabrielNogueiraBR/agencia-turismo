'use client'

import { Flex, Heading, Spacer } from '@chakra-ui/react'
import React from 'react'
import UserInfo from './UserInfo'

const Header = () => {
  return (
    <Flex position='relative' w="100%" direction="row" justify='center'>
      <Heading size="3xl">Agência de Turismo</Heading>
      <UserInfo />
    </Flex>
  )
}

export default Header
