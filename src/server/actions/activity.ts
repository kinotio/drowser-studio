'use server'

import { drizzle, eq, desc } from '@/server/drizzle'
import { activities } from '@/server/db/schema'

export const getLastThreeActivity = async (payload: { userId: string }) => {
  return drizzle
    .select()
    .from(activities)
    .where(eq(activities.user_id, payload.userId))
    .orderBy(desc(activities.created))
    .limit(3)
    .offset(0)
}
