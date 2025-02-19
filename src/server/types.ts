import { z } from 'zod'

import { ReportSchema, MetricSchema, ActivitySchema } from '@/server/validators'

export type Report = z.infer<typeof ReportSchema>
export type Metric = z.infer<typeof MetricSchema>
export type Activity = z.infer<typeof ActivitySchema>
