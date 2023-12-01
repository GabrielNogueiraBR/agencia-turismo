'use client'

import React from 'react'
import { Avatar, Flex, Link, Text, VStack } from '@chakra-ui/react'
import NextLink from 'next/link'
import { useAuth } from '@/context/AuthContext'

const UserInfo = () => {
  const { userInfo } = useAuth()

  console.log({ userInfo })

  return (
    <Flex direction="row" justify="center" align="center" gap="4">
      <VStack spacing={0} align="flex-end">
        <Text fontSize={'xl'}>{userInfo?.name}</Text>
        <Link as={NextLink} href="/pedidos" color="blueviolet">
          meus pedidos
        </Link>
      </VStack>
      <Avatar size="lg" bg="blue.400" name={userInfo?.name} />
    </Flex>
  )
}

export default UserInfo
