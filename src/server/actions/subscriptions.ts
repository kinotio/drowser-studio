'use server'

import { drizzle, eq } from '@/server/drizzle'
import { subscriptions } from '@/server/db/schema'
import { SubscriptionInferType } from '@/server/types'

export const getSubscription = async (payload: { userId: string }) => {
  return drizzle
    .select()
    .from(subscriptions)
    .where(eq(subscriptions.user_id, payload.userId))
    .limit(1)
}

export const saveSubscription = async (payload: SubscriptionInferType) => {
  return drizzle
    .insert(subscriptions)
    .values({
      user_id: payload.userId,
      plan_id: payload.planId,
      status: payload.status,
      start_date: payload.startDate,
      end_date: payload.endDate
    })
    .returning()
}
