import { z } from 'zod'

import { ModifyDeep, TContentCase } from '@/lib/definitions'

export const userSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  first_name: z.string().min(2).max(100),
  last_name: z.string().min(2).max(100)
})

export const reportSchema = z.object({
  id: z.string().optional(),
  name: z.string(),
  slug: z.string(),
  metadata: z.object({}).optional(),
  user_id: z.string()
})

export const metricSchema = z.object({
  id: z.string().optional(),
  year: z.number().int().positive(),
  total: z.number().int().nonnegative(),
  month: z.number().int().min(1).max(12),
  user_id: z.string()
})

export const logSchema = z.object({
  id: z.string().optional(),
  type: z.string(),
  description: z.string(),
  user_id: z.string(),
  device: z.string()
})

export type User = z.infer<typeof userSchema>
export type Report = z.infer<typeof reportSchema>
export type Metric = z.infer<typeof metricSchema>
export type Log = z.infer<typeof logSchema>

export type ReportModiefied = ModifyDeep<
  Report,
  'metadata',
  {
    drowser: {
      metrics: Metric[]
      cases: TContentCase[]
    }
  }
>
