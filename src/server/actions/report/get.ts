'use server'

import { and, eq, desc, sql, count } from 'drizzle-orm'

import { reports } from '@/server/databases/tables'
import { Report } from '@/server/databases/types'
import { ActionResponse } from '@/server/utils/types'

import database from '@/server/services/drizzle'

export type GetAllReportsInput = {
  userId: string
  searchTerm: string
  currentPage: number
  itemsPerPage: number
}

export const getAllReport = async (payload: GetAllReportsInput): Promise<ActionResponse<Report[]>> => {
  try {
    const result = await database
      .select()
      .from(reports)
      .where(and(eq(reports.user_id, payload.userId), sql`name LIKE ${`%${payload.searchTerm}%`}`))
      .orderBy(desc(reports.created))
      .limit(payload.itemsPerPage)
      .offset((payload.currentPage - 1) * payload.itemsPerPage)
    
    return {
      success: true,
      data: result as Report[]
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'An error occurred while fetching reports.'
    }
  }
}

export const getLastThreeReport = async (payload: { userId: string }): Promise<ActionResponse<Report[]>> => {
  try {
    const result = await database
      .select()
      .from(reports)
      .where(eq(reports.user_id, payload.userId))
      .orderBy(desc(reports.created))
      .limit(3)
      .offset(0)
    
    return {
      success: true,
      data: result as Report[]
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'An error occurred while fetching reports.'
    }
  }
}

export const countReports = async (payload: { userId: string }): Promise<ActionResponse<{count: number}>> => {
  try {
    const result = await database
      .select({ count: count(reports.id) })
      .from(reports)
      .where(eq(reports.user_id, payload.userId))
    
    return {
      success: true,
      data: { count: Number(result[0].count) }
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'An error occurred while counting reports.'
    }
  }
}

export const getReport = async (payload: { userId: string; reportSlug: string }): Promise<ActionResponse<Report>> => {
  try {
    const result = await database
      .select()
      .from(reports)
      .where(and(eq(reports.user_id, payload.userId), eq(reports.slug, payload.reportSlug)))
      .limit(1)
    
    if (result.length === 0) {
      return {
        success: false,
        error: 'Report not found.'
      }
    }
    
    return {
      success: true,
      data: result[0] as Report
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'An error occurred while fetching the report.'
    }
  }
}