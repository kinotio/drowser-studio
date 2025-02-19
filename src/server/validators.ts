import { z } from 'zod'

export const ReportSchema = z.object({
  name: z.string().max(256),
  slug: z.string().max(256),
  metadata: z.any(),
  userId: z.string().max(256)
})

export const MetricSchema = z.object({
  year: z.number(),
  total: z.number(),
  month: z.number(),
  userId: z.string().max(256)
})

export const ActivitySchema = z.object({
  type: z.string().max(256),
  description: z.string().max(256),
  userId: z.string().max(256),
  device: z.string().max(256)
})
