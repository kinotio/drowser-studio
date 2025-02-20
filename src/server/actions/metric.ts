'use server'

import { drizzle, eq, and } from '@/server/drizzle'
import { metrics } from '@/server/db/schema'
import { MetricInferType } from '@/server/types'

export const getCurrentYearMetrics = async (payload: { userId: string; currentYear: number }) => {
  return drizzle
    .select()
    .from(metrics)
    .where(and(eq(metrics.user_id, payload.userId), eq(metrics.year, payload.currentYear)))
}

export const getMetric = async (payload: { userId: string; year: number; month: number }) => {
  return drizzle
    .select()
    .from(metrics)
    .where(
      and(
        eq(metrics.user_id, payload.userId),
        eq(metrics.year, payload.year),
        eq(metrics.month, payload.month)
      )
    )
    .limit(1)
}
export const saveMetric = async (payload: MetricInferType) => {
  return drizzle
    .insert(metrics)
    .values({
      user_id: payload.userId,
      year: payload.year,
      month: payload.month,
      total: payload.total
    })
    .returning()
}

export const updateMetric = async (payload: { metricId: string; total: number }) => {
  return drizzle
    .update(metrics)
    .set({
      total: payload.total
    })
    .where(eq(metrics.id, payload.metricId))
    .returning()
}
