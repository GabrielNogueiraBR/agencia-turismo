'use client'

import { useCallback, useEffect, useState } from 'react'

function useStorageHook<T>(key: string, storageType: 'local' | 'session' = 'local') {
  const [value, setValue] = useState<string>()
  const [isLoading, setIsLoading] = useState(true)

  const storage = storageType === 'local' ? localStorage : sessionStorage

  const loadLocalStorageValue = useCallback(() => {
    const localValue = storage.getItem(key)
    if (localValue) setValue(localValue)
  }, [key, storage])

  const setLocalStorageValue = useCallback(
    (value: string) => {
      storage.setItem(key, value)
      setValue(value)
    },
    [key, storage],
  )

  const removeLocalStorageValue = useCallback(() => {
    storage.removeItem(key)
  }, [key, storage])

  useEffect(() => {
    loadLocalStorageValue()
    setIsLoading(false)
  }, [loadLocalStorageValue])

  return { value, isLoading, loadLocalStorageValue, setLocalStorageValue, removeLocalStorageValue }
}

export default useStorageHook
