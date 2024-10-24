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
