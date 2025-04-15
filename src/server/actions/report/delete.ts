'use server'

import { eq } from 'drizzle-orm'

import { reports } from '@/server/databases/tables'
import { Report } from '@/server/databases/types'
import { ActionResponse } from '@/server/utils/types'

import database from '@/server/services/drizzle'

export const deleteReport = async (payload: { reportId: string }): Promise<ActionResponse<Report>> => {
  try {
    const deleted = await database
      .delete(reports)
      .where(eq(reports.id, payload.reportId))
      .returning()
    
    if (deleted.length === 0) {
      return {
        success: false,
        error: 'Report not found or could not be deleted.'
      }
    }
    
    return {
      success: true,
      data: deleted[0] as Report
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'An error occurred while deleting the report.'
    }
  }
}