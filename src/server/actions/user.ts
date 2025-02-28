'use server'

import { drizzle, eq } from '@/server/drizzle'
import { users } from '@/server/db/schema'
import { UserInferType } from '@/server/types'

export const getUser = async (payload: { userId: string }) => {
  return drizzle.select().from(users).where(eq(users.id, payload.userId)).limit(1)
}

export const saveUser = async (payload: UserInferType) => {
  return drizzle
    .insert(users)
    .values({
      id: payload.id,
      email: payload.email,
      first_name: payload.firstName,
      last_name: payload.lastName
    })
    .returning()
}

export const updateUser = async (payload: UserInferType) => {
  return drizzle
    .update(users)
    .set({
      email: payload.email,
      first_name: payload.firstName,
      last_name: payload.lastName
    })
    .where(eq(users.id, payload.id))
    .returning()
}
