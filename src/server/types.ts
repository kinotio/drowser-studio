import { z } from 'zod'

import { ModifyDeep, Metric, TContentCase } from '@/lib/definitions'
import { reports, metrics, activities } from '@/server/db/schema'
import {
  ReportValidationSchema,
  MetricValidationSchema,
  ActivityValidationSchema
} from '@/server/validators'

export type ReportInferType = z.infer<typeof ReportValidationSchema>
export type MetricInferType = z.infer<typeof MetricValidationSchema>
export type ActivityInferType = z.infer<typeof ActivityValidationSchema>

export type ReportSelect = typeof reports.$inferSelect
export type ReportInsert = typeof reports.$inferInsert

export type MetricSelect = typeof metrics.$inferSelect
export type MetricInsert = typeof metrics.$inferInsert

export type ActivitySelect = typeof activities.$inferSelect
export type ActivityInsert = typeof activities.$inferInsert

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
