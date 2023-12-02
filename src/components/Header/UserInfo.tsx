'use client'

import React, { useMemo } from 'react'
import { Avatar, Flex, Link, Text, VStack } from '@chakra-ui/react'
import { useAuth } from '@/context/AuthContext'
import { usePathname } from 'next/navigation'
import NextLink from 'next/link'

const UserInfo = () => {
  const { userInfo } = useAuth()
  const pathname = usePathname()

  const href = useMemo(() => {
    if (pathname === '/pedidos') return '/'
    else return '/pedidos'
  }, [pathname])

  const linkText = useMemo(() => {
    if (pathname === '/pedidos') return 'início'
    else return 'meus pedidos'
  }, [pathname])

  return (
    <Flex position="absolute" right={0} direction="row" justify="center" align="center" gap="4">
      <VStack spacing={0} align="flex-end">
        <Text fontSize={'xl'}>{userInfo?.name}</Text>
        <Link as={NextLink} href={href} color="blueviolet">
          {linkText}
        </Link>
      </VStack>
      <Avatar size="lg" bg="blue.400" name={userInfo?.name} />
    </Flex>
  )
}

export default UserInfo
