'use server'

import { drizzle, eq, and } from '@/server/drizzle'
import { metrics } from '@/server/db/schema'

export const getList = async (payload: { userId: string; currentYear: number }) => {
  return drizzle
    .select()
    .from(metrics)
    .where(and(eq(metrics.user_id, payload.userId), eq(metrics.year, payload.currentYear)))
}
