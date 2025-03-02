'use server'

import { drizzle, eq } from '@/server/drizzle'
import { plans } from '@/server/db/schema'
import { PlanInferType } from '@/server/types'

export const getPlan = async (payload: { planId: string }) => {
  return drizzle.select().from(plans).where(eq(plans.id, payload.planId)).limit(1)
}

export const getFreePlan = async () => {
  return drizzle.select().from(plans).where(eq(plans.type, 'free')).limit(1)
}

export const savePlan = async (payload: PlanInferType) => {
  return drizzle
    .insert(plans)
    .values({
      name: payload.name,
      description: payload.description,
      duration: payload.duration,
      price: payload.price,
      price_id: payload.priceId,
      metadata: payload.metadata,
      type: payload.type
    })
    .returning()
}
