import flightApi from '@/service/flightApi'
import { TokenPresenter, UserPresenter } from '@/types/flightApi'
import { redirect, usePathname } from 'next/navigation'
import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'

interface AuthContextData {
  token?: string
  userInfo?: UserPresenter
  isLoading: boolean
  isSigning: boolean
  signIn: (username: string, password: string) => Promise<void>
}

export const AuthContext = createContext<AuthContextData>({} as AuthContextData)

interface ProviderProps {
  children?: React.ReactNode
}

export const AuthProvider = ({ children }: ProviderProps) => {
  const [token, setToken] = useState<string>()
  const [userInfo, setUserInfo] = useState<UserPresenter>()

  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [isSigning, setIsSigning] = useState<boolean>(false)

  const pathname = usePathname()
  if (!token && !isLoading && pathname !== '/auth')
    redirect(`/auth?callbackUrl=${encodeURIComponent(pathname)}`)

  const signIn = useCallback(async (username: string, password: string) => {
    try {
      setIsSigning(true)

      const response = await flightApi.post<TokenPresenter>('/auth/login', { username, password })
      const token = response.data

      setToken(token.token)
    } catch (e) {
      console.error(e)
    } finally {
      setIsSigning(false)
    }
  }, [])

  const loadUserInfo = useCallback(async () => {
    if (!token) return
    try {
      setIsLoading(true)

      // Update Header
      const config = { headers: { Authorization: `Bearer ${token}` } }
      const response = await flightApi.get<UserPresenter>('/users/me', config)
      setUserInfo(response.data)
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
    setIsLoading(false)
  }, [])

  return (
    <AuthContext.Provider value={{ token, isLoading, isSigning, signIn }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
