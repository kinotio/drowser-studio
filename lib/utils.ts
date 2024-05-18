import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

import { TFileContent } from '@/types'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function isValidFileContent (content: any): content is TFileContent {
  return (
    typeof content === 'object' &&
    content !== null &&
    'drowser' in content &&
    typeof content.drowser === 'object' &&
    typeof content.drowser.metrics === 'object' &&
    Array.isArray(content.drowser.cases)
  );
}
