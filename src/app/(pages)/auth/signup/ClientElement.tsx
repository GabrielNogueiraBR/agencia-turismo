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
  name: string
  email: string
  username: string
  taxId: string
  phone: string
  birthdate: string
  password: string
}

export default function ClientElement() {
  const [showPassword, setShowPassword] = useState(false)

  const searchParams = useSearchParams()
  const search = searchParams.get('callbackUrl') || '/'
  const callbackUrl = decodeURIComponent(search)

  const { token, isLoading, signIn } = useAuth()

  if (token && !isLoading) redirect(callbackUrl)

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<FormLogin>()

  const onSubmit = async (data: FormLogin) => {
    try {
      console.log({ data })
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <Flex flex="1" align={'center'} justify={'center'}>
      <Stack spacing={8} mx={'auto'} maxW={'2xl'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'}>Faça seu cadastro 😎</Heading>
        </Stack>
        <Box rounded={'lg'} bg="white" boxShadow={'lg'} p={8}>
          <Stack spacing={4}>
            <FormControl isInvalid={!!errors.name} isRequired>
              <FormLabel>Nome</FormLabel>
              <Input
                type="text"
                {...register('name', { required: true })}
                isDisabled={isSubmitting}
              />
            </FormControl>
            <HStack>
              <Box flex="1">
                <FormControl isInvalid={!!errors.username} isRequired>
                  <FormLabel>Username</FormLabel>
                  <Input
                    type="text"
                    {...register('username', { required: true })}
                    isDisabled={isSubmitting}
                  />
                </FormControl>
              </Box>
              <Box flex="0.8">
                <FormControl isInvalid={!!errors.birthdate} isRequired>
                  <FormLabel>Data de Nascimento</FormLabel>
                  <Input
                    type="date"
                    {...register('birthdate', { required: true })}
                    isDisabled={isSubmitting}
                  />
                </FormControl>
              </Box>
            </HStack>
            <HStack>
              <Box>
                <FormControl isInvalid={!!errors.phone} isRequired>
                  <FormLabel>Celular</FormLabel>
                  <Input
                    type="text"
                    {...register('phone', {
                      required: true,
                      minLength: { value: 11, message: '11 caracteres' },
                      maxLength: { value: 11, message: '11 caracteres' },
                    })}
                    isDisabled={isSubmitting}
                  />
                </FormControl>
              </Box>
              <Box>
                <FormControl isInvalid={!!errors.taxId} isRequired>
                  <FormLabel>CEP</FormLabel>
                  <Input
                    type="text"
                    {...register('taxId', {
                      required: true,
                      minLength: { value: 11, message: '11 caracteres' },
                      maxLength: { value: 11, message: '11 caracteres' },
                    })}
                    isDisabled={isSubmitting}
                  />
                </FormControl>
              </Box>
            </HStack>

            <FormControl isInvalid={!!errors.email} isRequired>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                {...register('email', { required: true })}
                isDisabled={isSubmitting}
              />
            </FormControl>
            <FormControl isInvalid={!!errors.password} isRequired>
              <FormLabel>Senha</FormLabel>
              <InputGroup>
                <Input
                  type={showPassword ? 'text' : 'password'}
                  {...register('password', { required: true })}
                  isDisabled={isSubmitting}
                />
                <InputRightElement h={'full'}>
                  <Button
                    variant={'ghost'}
                    onClick={() => setShowPassword((showPassword) => !showPassword)}
                  >
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
