'use server'

import { drizzle, eq, desc, and, sql, count } from '@/server/drizzle'
import { logs } from '@/server/db/schema'
import { LogInferType } from '@/server/types'

export const getAllLogs = async (payload: {
  userId: string
  currentPage: number
  itemsPerPage: number
  searchTerm: string
}) => {
  return drizzle
    .select()
    .from(logs)
    .where(
      and(eq(logs.user_id, payload.userId), sql`description LIKE ${`%${payload.searchTerm}%`}`)
    )
    .orderBy(desc(logs.created))
    .limit(payload.itemsPerPage)
    .offset((payload.currentPage - 1) * payload.itemsPerPage)
}

export const getLastThreeLogs = async (payload: { userId: string }) => {
  return drizzle
    .select()
    .from(logs)
    .where(eq(logs.user_id, payload.userId))
    .orderBy(desc(logs.created))
    .limit(3)
    .offset(0)
}

export const saveLog = async (payload: LogInferType) => {
  return drizzle
    .insert(logs)
    .values({
      user_id: payload.userId,
      type: payload.type,
      description: payload.description,
      device: payload.device
    })
    .returning()
}

export const countLogs = async (payload: { userId: string }) => {
  return drizzle
    .select({ count: count(logs.id) })
    .from(logs)
    .where(eq(logs.user_id, payload.userId))
}
