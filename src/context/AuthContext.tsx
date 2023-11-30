import flightApi from '@/service/flightApi'
import { TokenPresenter } from '@/types/flightApi'
import { redirect, usePathname } from 'next/navigation'
import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'

interface AuthContextData {
  token?: string
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

  const contextData: AuthContextData = useMemo(
    () => ({ token, isLoading, isSigning, signIn }),
    [token, isLoading, isSigning, signIn],
  )

  useEffect(() => {
    setIsLoading(false)
  }, [])

  return <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)
