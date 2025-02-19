'use server'

import { drizzle, eq, desc } from '@/server/drizzle'
import { reports } from '@/server/db/schema'
import { Report } from '@/server/types'

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

export const saveReport = async (payload: Report) => {
  return drizzle.insert(reports).values({
    user_id: payload.userId,
    name: payload.name,
    slug: payload.slug,
    metadata: payload.metadata
  })
}
