/* eslint-disable @typescript-eslint/no-explicit-any */
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { isEmpty } from 'lodash'

import { TFileContent } from '@/lib/definitions'
import { months } from '@lib/constants'

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

export function getDeviceType(agent: string): 'mobile' | 'desktop' {
  const isMobile = /Mobi|Android|iPhone|iPad|iPod|BlackBerry|Opera Mini|IEMobile|WPDesktop/i.test(
    agent
  )

  return isMobile ? 'mobile' : 'desktop'
}

export const humanizeDuration = (durationMs: number): string => {
  if (durationMs < 1000) {
    return `${Math.round(durationMs)}ms`
  } else {
    const secondsTotal = Math.round(durationMs / 1000)
    const minutesTotal = Math.floor(secondsTotal / 60)
    const hoursTotal = Math.floor(minutesTotal / 60)
    const days = Math.floor(hoursTotal / 24)

    let humanized = ''
    if (days > 0) humanized += `${days}d `
    if (hoursTotal > 0) humanized += `${hoursTotal}h `
    if (minutesTotal > 0) humanized += `${minutesTotal}m `
    if (secondsTotal > 0 || (days === 0 && hoursTotal === 0 && minutesTotal === 0)) {
      humanized += `${secondsTotal}s`
    }

    return isEmpty(humanized) ? '0' : humanized.trim()
  }
}

export const getMonthName = (monthNumber: number): string => {
  if (monthNumber < 1 || monthNumber > 12) {
    throw new Error('Invalid month number. Must be between 1 and 12.')
  }
  return months[monthNumber - 1]
}
