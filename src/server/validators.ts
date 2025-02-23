import { z } from 'zod'

export const ReportValidationSchema = z.object({
  name: z.string().max(256),
  slug: z.string().max(256),
  metadata: z.any(),
  userId: z.string().max(256)
})

export const MetricValidationSchema = z.object({
  year: z.number(),
  total: z.number(),
  month: z.number(),
  userId: z.string().max(256)
})

export const LogValidationSchema = z.object({
  type: z.string().max(256),
  description: z.string().max(256),
  userId: z.string().max(256),
  device: z.string().max(256)
})

export const UserValidationSchema = z.object({
  id: z.string().max(256),
  email: z.string().max(256),
  firstName: z.string().max(256),
  lastName: z.string().max(256)
})
