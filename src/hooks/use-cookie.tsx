import { useState, useEffect } from 'react'

export function useCookie(name: string) {
  const getCookie = (cookieName: string) => {
    if (typeof document === 'undefined') return null
    const cookies = document.cookie.split('; ').reduce(
      (acc, cookie) => {
        const [key, value] = cookie.split('=')
        acc[key] = decodeURIComponent(value)
        return acc
      },
      {} as Record<string, string>
    )
    return cookies[cookieName] || null
  }

  const [cookie, setCookie] = useState<string | null>(() => getCookie(name))

  useEffect(() => {
    const handleStorageChange = () => {
      setCookie(getCookie(name))
    }

    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [name])

  return cookie
}
