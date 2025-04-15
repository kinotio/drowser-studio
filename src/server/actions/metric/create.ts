'use server'

import { metrics } from '@/server/databases/tables'
import { Metric } from '@/server/databases/types'
import { ActionResponse } from '@/server/utils/types'
import { MetricValidation } from '@/server/validations/metric'
import database from '@/server/services/drizzle'

export const createMetric = async (payload: Metric): Promise<ActionResponse<Metric>> => {
  try {
    // Clean and validate input
    const validation = MetricValidation.safeParse(payload)

    if (!validation.success) {
      return {
        success: false,
        error: validation.error.issues[0].message
      }
    }

    // Create metric
    const data = {
      user_id: payload.user_id,
      year: payload.year,
      month: payload.month,
      total: payload.total
    }

    const created = await database.insert(metrics).values(data).returning()

    return {
      success: true,
      data: created[0] as Metric
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'An error occurred while creating the metric.'
    }
  }
}
