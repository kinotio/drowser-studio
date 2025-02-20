'use server'

import { drizzle, eq, desc, and, sql, count } from '@/server/drizzle'
import { activities } from '@/server/db/schema'
import { ActivityInferType } from '@/server/types'

export const getAllActivities = async (payload: {
  userId: string
  currentPage: number
  itemsPerPage: number
  searchTerm: string
}) => {
  return drizzle
    .select()
    .from(activities)
    .where(
      and(
        eq(activities.user_id, payload.userId),
        sql`description LIKE ${`%${payload.searchTerm}%`}`
      )
    )
    .orderBy(desc(activities.created))
    .limit(payload.itemsPerPage)
    .offset((payload.currentPage - 1) * payload.itemsPerPage)
}

export const getLastThreeActivity = async (payload: { userId: string }) => {
  return drizzle
    .select()
    .from(activities)
    .where(eq(activities.user_id, payload.userId))
    .orderBy(desc(activities.created))
    .limit(3)
    .offset(0)
}

export const saveActivity = async (payload: ActivityInferType) => {
  return drizzle
    .insert(activities)
    .values({
      user_id: payload.userId,
      type: payload.type,
      description: payload.description,
      device: payload.device
    })
    .returning()
}

export const countActivities = async (payload: { userId: string }) => {
  return drizzle
    .select({ count: count(activities.id) })
    .from(activities)
    .where(eq(activities.user_id, payload.userId))
}
