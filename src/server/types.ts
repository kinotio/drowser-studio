import { z } from 'zod'

import { ModifyDeep, Metric, TContentCase } from '@/lib/definitions'
import { reports, metrics, logs } from '@/server/db/schema'
import {
  ReportValidationSchema,
  MetricValidationSchema,
  LogValidationSchema
} from '@/server/validators'

export type ReportInferType = z.infer<typeof ReportValidationSchema>
export type MetricInferType = z.infer<typeof MetricValidationSchema>
export type LogInferType = z.infer<typeof LogValidationSchema>

export type ReportSelect = typeof reports.$inferSelect
export type ReportInsert = typeof reports.$inferInsert

export type MetricSelect = typeof metrics.$inferSelect
export type MetricInsert = typeof metrics.$inferInsert

export type LogSelect = typeof logs.$inferSelect
export type LogInsert = typeof logs.$inferInsert

export type ReportModiefied = ModifyDeep<
  ReportSelect,
  'metadata',
  {
    drowser: {
      metrics: Metric
      cases: TContentCase[]
    }
  }
>
