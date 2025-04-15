import { Log, Report } from '@/server/databases/types'

// Add timestamp fields from the database tables
export type LogWithTimestamps = Log & {
  created: Date | string
  updated: Date | string
}

export type ReportWithTimestamps = Report & {
  created: Date | string
  updated: Date | string
}