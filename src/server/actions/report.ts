'use server'

import { drizzle, eq, desc } from '@/server/drizzle'
import { reports } from '@/server/db/schema'

export const getAllReport = async (payload: { userId: string }) => {
  return drizzle.select().from(reports).where(eq(reports.user_id, payload.userId))
}

export const getLastThreeReport = async (payload: { userId: string }) => {
  return drizzle
    .select()
    .from(reports)
    .where(eq(reports.user_id, payload.userId))
    .orderBy(desc(reports.created))
    .limit(3)
    .offset(0)
}
