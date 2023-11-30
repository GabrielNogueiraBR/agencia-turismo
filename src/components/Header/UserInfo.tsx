'use client'

import React from 'react'
import { Avatar, Flex, Link, Text, VStack } from '@chakra-ui/react'
import NextLink from 'next/link'

const UserInfo = () => {
  return (
    <Flex direction="row" justify="center" align="center" gap="4">
      <VStack spacing={0} align="flex-end">
        <Text fontSize={'xl'}>Gabriel Nogueira</Text>
        <Link as={NextLink} href="/pedidos" color="blueviolet">
          meus pedidos
        </Link>
      </VStack>
      <Avatar size="lg" name="Gabriel Nogueira" />
    </Flex>
  )
}

export default UserInfo
