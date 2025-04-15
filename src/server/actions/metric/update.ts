'use server'

import { eq } from 'drizzle-orm'

import { metrics } from '@/server/databases/tables'
import { Metric } from '@/server/databases/types'
import { ActionResponse } from '@/server/utils/types'
import database from '@/server/services/drizzle'

export type UpdateMetricInput = {
  metricId: string
  total: number
}

export const updateMetric = async (payload: UpdateMetricInput): Promise<ActionResponse<Metric>> => {
  try {
    const updated = await database
      .update(metrics)
      .set({
        total: payload.total
      })
      .where(eq(metrics.id, payload.metricId))
      .returning()

    if (updated.length === 0) {
      return {
        success: false,
        error: 'Metric not found.'
      }
    }

    return {
      success: true,
      data: updated[0] as Metric
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'An error occurred while updating the metric.'
    }
  }
}
