'use server'

import { users } from '@/server/databases/tables'
import { User } from '@/server/databases/types'

import { ActionResponse } from '@/server/utils/types'

import { UserValidation } from '@/server/validations/user'
import database from '@/server/services/drizzle'

export const createUser = async (payload: User): Promise<ActionResponse<User>> => {
  try {
    // Clean and validate input
    const validation = UserValidation.safeParse(payload)

    if (!validation.success) {
      return {
        success: false,
        error: validation.error.issues[0].message
      }
    }

    // Check if email already exists
    const existingUser = await database.query.users.findFirst({
      where: (users, { eq }) => eq(users.email, payload.email)
    })

    if (existingUser) {
      return {
        success: false,
        error:
          existingUser.email === payload.email
            ? 'An account with this username already exists.'
            : 'An account with this email already exists.'
      }
    }

    // Create user
    const data: Omit<User, 'created_at' | 'updated_at'> = {
      id: payload.id,
      email: payload.email.toLowerCase(),
      first_name: payload.first_name,
      last_name: payload.last_name
    }

    const created = await database.insert(users).values(data).returning()

    return {
      success: true,
      data: created[0] as User
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'An error occurred while creating the user.'
    }
  }
}
