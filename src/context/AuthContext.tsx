import useStorageHook from '@/hook/useStorageHook'
import flightApi from '@/service/flightApi'
import hotelApi from '@/service/hotelApi'
import { CreateUserDto, TokenPresenter, UserPresenter } from '@/types/flightApi'
import { User, UserCreateDto } from '@/types/hotelApi'
import { redirect, usePathname } from 'next/navigation'
import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'

interface AuthContextData {
  token?: string
  userInfo?: UserPresenter
  userHotel?: User
  isLoading: boolean
  isSigning: boolean
  signIn: (username: string, password: string) => Promise<void>
  signUp: (params: CreateUserDto & UserCreateDto) => Promise<void>
}

export const AuthContext = createContext<AuthContextData>({} as AuthContextData)

interface ProviderProps {
  children?: React.ReactNode
}

export const AuthProvider = ({ children }: ProviderProps) => {
  const [token, setToken] = useState<string>()
  const [userInfo, setUserInfo] = useState<UserPresenter>()
  const [userHotel, setUserHotel] = useState<User>()

  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [isSigning, setIsSigning] = useState<boolean>(false)

  const {
    value: tokenAeroZen,
    isLoading: isLoadingToken,
    setLocalStorageValue,
  } = useStorageHook('token-aerozen', 'session')

  const pathname = usePathname()
  if (!token && !isLoading && !['/auth/login', '/auth/signup'].includes(pathname))
    redirect(`/auth/login?callbackUrl=${encodeURIComponent(pathname)}`)

  const signIn = useCallback(
    async (username: string, password: string) => {
      try {
        setIsSigning(true)

        const response = await flightApi.post<TokenPresenter>('/auth/login', { username, password })
        const token = response.data

        setToken(token.token)
        setLocalStorageValue(token.token)
      } catch (e) {
        console.error(e)
      } finally {
        setIsSigning(false)
      }
    },
    [setLocalStorageValue],
  )

  const signUp = useCallback(
    async (params: CreateUserDto & UserCreateDto) => {
      const userHotelPayload: UserCreateDto = {
        name: params.name,
        email: params.email,
        taxId: params.taxId,
        phone: params.phone,
        birthdate: params.birthdate,
      }

      await hotelApi.post<User>('/users', userHotelPayload)

      const userFlightPayload: CreateUserDto = {
        name: params.name,
        email: params.email,
        username: params.username,
        password: params.password,
      }
      await flightApi.post<UserPresenter>('/users', userFlightPayload)

      await signIn(params.username, params.password)
    },
    [signIn],
  )

  const loadUserInfo = useCallback(async () => {
    if (!token) return
    try {
      setIsLoading(true)

      // Update Header
      const config = { headers: { Authorization: `Bearer ${token}` } }
      const response = await flightApi.get<UserPresenter>('/users/me', config)
      const userPresenter = response.data
      setUserInfo(userPresenter)

      const usersResponse = await hotelApi.get<{ records: User[] }>('/users')
      const users = usersResponse.data.records

      const userHotel = users.find(
        (user) => user.email.toLowerCase() === userPresenter.email.toLowerCase(),
      )
      if (userHotel) setUserHotel(userHotel)
    } catch (e) {
      console.error(e)
    } finally {
      setIsLoading(false)
    }
  }, [token])

  useEffect(() => {
    if (token) loadUserInfo()
  }, [token, loadUserInfo])

  useEffect(() => {
    if (!token && tokenAeroZen) setToken(tokenAeroZen)
  }, [tokenAeroZen, token])

  useEffect(() => {
    if (!isLoadingToken) setIsLoading(false)
  }, [isLoadingToken])

  return (
    <AuthContext.Provider value={{ token, isLoading, isSigning, signIn, userInfo, signUp }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
