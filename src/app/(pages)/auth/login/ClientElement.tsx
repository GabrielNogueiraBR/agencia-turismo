'use client'

import { useAuth } from '@/context/AuthContext'
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Button,
  Heading,
  Link,
} from '@chakra-ui/react'
import NextLink from 'next/link'
import { redirect, useSearchParams } from 'next/navigation'
import { useForm } from 'react-hook-form'

interface FormLogin {
  username: string
  password: string
}

export default function ClientElement() {
  const searchParams = useSearchParams()
  const search = searchParams.get('callbackUrl') || '/'
  const callbackUrl = decodeURIComponent(search)

  const { token, isLoading, signIn, isSigning } = useAuth()

  if (token && !isLoading) redirect(callbackUrl)

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<FormLogin>()

  const onSubmit = async (data: FormLogin) => {
    try {
      signIn(data.username, data.password)
      redirect('/')
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <Flex flex="1" align={'center'} justify={'center'}>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'}>Entre em sua conta ✌️</Heading>
        </Stack>
        <Box rounded={'lg'} bg="white" boxShadow={'lg'} p={8}>
          <Stack spacing={4}>
            <FormControl id="email" isInvalid={!!errors.username}>
              <FormLabel>Username</FormLabel>
              <Input
                type="username"
                {...register('username', { required: true })}
                autoComplete="off"
                isDisabled={isSigning}
              />
            </FormControl>
            <FormControl id="password" isInvalid={!!errors.password}>
              <FormLabel>Senha</FormLabel>
              <Input
                type="password"
                {...register('password', { required: true })}
                autoComplete="off"
                isDisabled={isSigning}
              />
            </FormControl>
            <Stack spacing={8}>
              <Stack direction="column" align={'start'} justify={'space-between'} spacing={2}>
                <Checkbox>Remember me</Checkbox>
                <Link href="/auth/signup" as={NextLink} alignSelf="center" color="blue.500">
                  Criar uma conta
                </Link>
              </Stack>
              <Button
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}
                isLoading={isSubmitting}
                loadingText="Entrando..."
                onClick={handleSubmit(onSubmit)}
              >
                Entrar
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  )
}
