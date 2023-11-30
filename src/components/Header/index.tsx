'use client'

import { Flex, Heading, Spacer } from '@chakra-ui/react'
import React from 'react'
import UserInfo from './UserInfo'

const Header = () => {
  return (
    <Flex w="100%" direction="row">
      <Spacer />
      <Heading size="3xl">Agência de Turismo</Heading>
      <Spacer />
      <UserInfo />
    </Flex>
  )
}

export default Header
