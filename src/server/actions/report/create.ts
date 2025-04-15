'use server'

import { reports } from '@/server/databases/tables'
import { Report } from '@/server/databases/types'
import { ActionResponse } from '@/server/utils/types'
import { ReportValidation } from '@/server/validations/report'
import database from '@/server/services/drizzle'

export const createReport = async (payload: Report): Promise<ActionResponse<Report>> => {
  try {
    // Clean and validate input
    const validation = ReportValidation.safeParse(payload)

    if (!validation.success) {
      return {
        success: false,
        error: validation.error.issues[0].message
      }
    }

    // Create report
    const data = {
      user_id: payload.user_id,
      name: payload.name,
      slug: payload.slug,
      metadata: payload.metadata || {}
    }

    const created = await database.insert(reports).values(data).returning()

    return {
      success: true,
      data: created[0] as Report
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'An error occurred while creating the report.'
    }
  }
}
