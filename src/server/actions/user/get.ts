'use server'

import { eq } from 'drizzle-orm'

import { users } from '@/server/databases/tables'
import { User } from '@/server/databases/types'
import { ActionResponse } from '@/server/utils/types'

import database from '@/server/services/drizzle'

export type CreateUserInput = {
  email: string
  first_name: string
  last_name: string
}

export type UpdateUserInput = Partial<Omit<User, 'id' | 'created_at' | 'updated_at'>>

export type UserWithReport = User & {
  reports: {
    id: string
    name: string
    slug: string
    metadata: Record<string, unknown>
    user_id: string
  }[]
}

export const getUserById = async (payload: { userId: string }): Promise<ActionResponse<User>> => {
  try {
    const user = await database.query.users.findFirst({
      where: eq(users.id, payload.userId)
    })

    if (!user) {
      return {
        success: false,
        error: 'An error occurred while fetching user.'
      }
    }

    return {
      success: true,
      data: user as User
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'An error occurred while fetching user.'
    }
  }
}
