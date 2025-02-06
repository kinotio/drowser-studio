'use server'

import { drizzle } from '@/server/drizzle'
import { reports } from '@/server/db/schema'

import { Report } from '@/lib/definitions'

export const save = async (payload: Report) => {
  return drizzle.insert(reports).values(payload)
}
