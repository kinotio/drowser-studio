'use server'

import { and, eq } from 'drizzle-orm'

import { metrics } from '@/server/databases/tables'
import { Metric } from '@/server/databases/types'
import { ActionResponse } from '@/server/utils/types'

import database from '@/server/services/drizzle'

export type GetCurrentYearMetricsInput = {
  userId: string
  currentYear: number
}

export type GetMetricInput = {
  userId: string
  year: number
  month: number
}

export const getCurrentYearMetrics = async (payload: GetCurrentYearMetricsInput): Promise<ActionResponse<Metric[]>> => {
  try {
    const result = await database
      .select()
      .from(metrics)
      .where(and(eq(metrics.user_id, payload.userId), eq(metrics.year, payload.currentYear)))
    
    return {
      success: true,
      data: result as Metric[]
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'An error occurred while fetching metrics.'
    }
  }
}

export const getMetric = async (payload: GetMetricInput): Promise<ActionResponse<Metric>> => {
  try {
    const result = await database
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
    
    if (result.length === 0) {
      return {
        success: false,
        error: 'Metric not found.'
      }
    }
    
    return {
      success: true,
      data: result[0] as Metric
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'An error occurred while fetching the metric.'
    }
  }
}