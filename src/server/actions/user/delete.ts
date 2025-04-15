'use server'

import { eq } from 'drizzle-orm'

import { users } from '@/server/databases/tables'
import { User } from '@/server/databases/types'
import { ActionResponse } from '@/server/utils/types'

import database from '@/server/services/drizzle'

export const deleteUser = async (payload: { user_id: string }): Promise<ActionResponse<User>> => {
  try {
    // Verify user exists
    const existingUser = await database.query.users.findFirst({
      where: eq(users.id, payload.user_id)
    })

    if (!existingUser) {
      return {
        success: false,
        error: 'User not found.'
      }
    }

    // Delete user
    const deleted = await database.delete(users).where(eq(users.id, payload.user_id)).returning()

    if (!deleted.length) {
      return {
        success: false,
        error: 'Failed to delete user.'
      }
    }

    return {
      success: true,
      data: deleted[0] as User
    }
  } catch (error) {
    console.error('Delete user error:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'An error occurred while deleting the user.'
    }
  }
}
