'use server'

import { drizzle, eq, desc } from '@/server/drizzle'
import { activities } from '@/server/db/schema'
import { Activity } from '@/server/types'

export const getLastThreeActivity = async (payload: { userId: string }) => {
  return drizzle
    .select()
    .from(activities)
    .where(eq(activities.user_id, payload.userId))
    .orderBy(desc(activities.created))
    .limit(3)
    .offset(0)
}

export const saveActivity = async (payload: Activity) => {
  return drizzle.insert(activities).values({
    user_id: payload.userId,
    type: payload.type,
    description: payload.description,
    device: payload.device
  })
}
