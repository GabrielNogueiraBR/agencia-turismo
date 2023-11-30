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
  Text,
  HStack,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react'
import NextLink from 'next/link'
import { redirect, useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'

interface FormLogin {
  username: string
  password: string
}

export default function ClientElement() {
  const [showPassword, setShowPassword] = useState(false)
  
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
          <Heading fontSize={'4xl'}>Faça seu cadastro 😎</Heading>
        </Stack>
        <Box rounded={'lg'} bg="white" boxShadow={'lg'} p={8}>
          <Stack spacing={4}>
            <HStack>
              <Box>
                <FormControl id="firstName" isRequired>
                  <FormLabel>First Name</FormLabel>
                  <Input type="text" />
                </FormControl>
              </Box>
              <Box>
                <FormControl id="lastName">
                  <FormLabel>Last Name</FormLabel>
                  <Input type="text" />
                </FormControl>
              </Box>
            </HStack>

            <FormControl id="email" isRequired>
              <FormLabel>Email address</FormLabel>
              <Input type="email" />
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input type={showPassword ? 'text' : 'password'} />
                <InputRightElement h={'full'}>
                  <Button
                    variant={'ghost'}
                    onClick={() => setShowPassword((showPassword) => !showPassword)}>
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>

            <Stack spacing={8}>
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
                Cadastrar
              </Button>

              <Stack direction="column" align={'center'} justify={'space-between'} spacing={2}>
                <Text>
                  Já possui uma conta?{' '}
                  <Link href="/auth/login" as={NextLink} color="blue.500">
                    Entrar
                  </Link>
                </Text>
              </Stack>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  )
}
