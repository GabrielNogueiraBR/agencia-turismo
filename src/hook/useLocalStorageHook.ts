import { useCallback, useEffect, useState } from 'react'

function useLocalStorageHook<T>(key: string) {
  const [value, setValue] = useState<string>()
  const [isLoading, setIsLoading] = useState(true)

  const loadLocalStorageValue = useCallback(() => {
    const localValue = localStorage.getItem(key)
    if (localValue) setValue(localValue)
  }, [key])

  const setLocalStorageValue = useCallback(
    (value: string) => {
      localStorage.setItem(key, value)
      setValue(value)
    },
    [key],
  )

  useEffect(() => {
    loadLocalStorageValue()
    setIsLoading(false)
  }, [loadLocalStorageValue])

  return { value, isLoading, loadLocalStorageValue, setLocalStorageValue }
}

export default useLocalStorageHook
