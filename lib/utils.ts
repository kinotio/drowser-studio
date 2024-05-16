import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

import { FileContent } from '@/types'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function isValidFileContent (content: any): content is FileContent {
  return (
    typeof content === 'object' &&
    content !== null &&
    'drowser' in content &&
    typeof content.drowser === 'object' &&
    Array.isArray(content.drowser.cases)
  );
}
