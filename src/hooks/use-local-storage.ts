"use client"

import { useEffect, useState } from "react"

export function useLocalStorage<T>(key: string) {
  const [value, setValue] = useState<T | false>(false)

  useEffect(() => {
    try {
      const item = localStorage.getItem(key)
      if (item) {
        setValue(JSON.parse(item) as T)
      } else {
        setValue(false)
      }
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error)
      setValue(false)
    }
  }, [key])

  const setStoredValue = (newValue: T) => {
    try {
      setValue(newValue)
      localStorage.setItem(key, JSON.stringify(newValue))
    } catch (error) {
      console.warn(`Error setting localStorage key "${key}":`, error)
    }
  }

  return [value, setStoredValue] as const
}
