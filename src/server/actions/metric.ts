'use server'

import { drizzle, eq, and } from '@/server/drizzle'
import { metrics } from '@/server/db/schema'
import { Metric } from '@/server/types'

export const getList = async (payload: { userId: string; currentYear: number }) => {
  return drizzle
    .select()
    .from(metrics)
    .where(and(eq(metrics.user_id, payload.userId), eq(metrics.year, payload.currentYear)))
}

export const saveMetric = async (payload: Metric) => {
  return drizzle.insert(metrics).values({
    user_id: payload.userId,
    year: payload.year,
    month: payload.month,
    total: payload.total
  })
}
