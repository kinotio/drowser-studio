'use server'

import { eq, and, sql, desc, count } from 'drizzle-orm'

import { logs } from '@/server/databases/tables'
import { Log } from '@/server/databases/types'
import { ActionResponse } from '@/server/utils/types'

import database from '@/server/services/drizzle'

export type GetLogInput = {
  logId: string
}

export type GetUserLogsInput = {
  userId: string
  limit?: number
  offset?: number
}

export type GetAllLogsInput = {
  userId: string
  currentPage: number
  itemsPerPage: number
  searchTerm: string
}

export const getLogById = async (payload: GetLogInput): Promise<ActionResponse<Log>> => {
  try {
    const log = await database.query.logs.findFirst({
      where: eq(logs.id, payload.logId)
    })

    if (!log) {
      return {
        success: false,
        error: 'Log not found.'
      }
    }

    return {
      success: true,
      data: log as Log
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'An error occurred while fetching log.'
    }
  }
}

export const getLogsByUserId = async (
  payload: GetUserLogsInput
): Promise<ActionResponse<Log[]>> => {
  try {
    const data = await database.query.logs.findMany({
      where: eq(logs.user_id, payload.userId),
      orderBy: (logs, { desc }) => [desc(logs.created)],
      limit: payload.limit || 10,
      offset: payload.offset || 0
    })

    return {
      success: true,
      data: data as Log[]
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'An error occurred while fetching logs.'
    }
  }
}

export const getAllLogs = async (payload: GetAllLogsInput): Promise<ActionResponse<Log[]>> => {
  try {
    const result = await database
      .select()
      .from(logs)
      .where(
        and(eq(logs.user_id, payload.userId), sql`description LIKE ${`%${payload.searchTerm}%`}`)
      )
      .orderBy(desc(logs.created))
      .limit(payload.itemsPerPage)
      .offset((payload.currentPage - 1) * payload.itemsPerPage)

    return {
      success: true,
      data: result as Log[]
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'An error occurred while fetching logs.'
    }
  }
}

export const getLastThreeLogs = async (payload: {
  userId: string
}): Promise<ActionResponse<Log[]>> => {
  try {
    const result = await database
      .select()
      .from(logs)
      .where(eq(logs.user_id, payload.userId))
      .orderBy(desc(logs.created))
      .limit(3)
      .offset(0)

    return {
      success: true,
      data: result as Log[]
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'An error occurred while fetching logs.'
    }
  }
}

export const countLogs = async (payload: {
  userId: string
}): Promise<ActionResponse<{ count: number }>> => {
  try {
    const result = await database
      .select({ count: count(logs.id) })
      .from(logs)
      .where(eq(logs.user_id, payload.userId))

    return {
      success: true,
      data: { count: Number(result[0].count) }
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'An error occurred while counting logs.'
    }
  }
}
