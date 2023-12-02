'use client'

import { Flex, FlexProps, Heading } from '@chakra-ui/react'
import React from 'react'
import UserInfo from './UserInfo'

interface HeaderProps extends FlexProps {
  heading?: string
}

const Header = ({ heading = 'Agência de Turismo', ...rest }: HeaderProps) => {
  return (
    <Flex position="relative" w="100%" direction="row" justify="center" {...rest}>
      <Heading size="3xl">{heading}</Heading>
      <UserInfo />
    </Flex>
  )
}

export default Header
