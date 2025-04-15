'use server'

import { logs } from '@/server/databases/tables'
import { Log } from '@/server/databases/types'

import { ActionResponse } from '@/server/utils/types'
import { LogValidation } from '@/server/validations/log'
import database from '@/server/services/drizzle'

export const createLog = async (payload: Log): Promise<ActionResponse<Log>> => {
  try {
    // Clean and validate input
    const validation = LogValidation.safeParse(payload)

    if (!validation.success) {
      return {
        success: false,
        error: validation.error.issues[0].message
      }
    }

    // Create log
    const data = {
      type: payload.type,
      description: payload.description,
      user_id: payload.user_id,
      device: payload.device
    }

    const created = await database.insert(logs).values(data).returning()

    return {
      success: true,
      data: created[0] as Log
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'An error occurred while creating the log.'
    }
  }
}
