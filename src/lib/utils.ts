/* eslint-disable @typescript-eslint/no-explicit-any */
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

import { TFileContent } from '@/lib/definitions'

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs))
}

export const getCurrentYear = () => new Date().getFullYear()

export const isValidFileContent = (content: any): content is TFileContent => {
  return (
    typeof content === 'object' &&
    content !== null &&
    'drowser' in content &&
    typeof content.drowser === 'object' &&
    typeof content.drowser.metrics === 'object' &&
    Array.isArray(content.drowser.cases)
  )
}

export const readableTimestamp = (timestamp: string): string => {
  const date = new Date(timestamp)

  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0') // Adding 1 because getMonth returns zero-based month index
  const day = String(date.getDate()).padStart(2, '0')
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  const seconds = String(date.getSeconds()).padStart(2, '0')

  const readableTimestamp = `${year}-${month}-${day} - ${hours}:${minutes}:${seconds}`

  return readableTimestamp
}

export const formatToReadable = (text: string): string => {
  return text
    .replace(/_/g, ' ') // Replace underscores with spaces
    .replace(/\b\w/g, (char) => char.toUpperCase()) // Capitalize the first letter of each word
}

export const getDeviceType = (userAgent: string) => {
  const mobileKeywords = [
    'Android',
    'iPhone',
    'iPad',
    'iPod',
    'BlackBerry',
    'Opera Mini',
    'IEMobile',
    'Mobile',
    'Windows Phone'
  ]
  const desktopKeywords = ['Macintosh', 'Windows NT', 'Linux']

  if (mobileKeywords.some((keyword) => userAgent.includes(keyword))) {
    return 'mobile'
  } else if (desktopKeywords.some((keyword) => userAgent.includes(keyword))) {
    return 'desktop'
  } else {
    return 'unknown'
  }
}
