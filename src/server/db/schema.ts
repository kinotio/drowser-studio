import { varchar, pgTable, uuid, timestamp, jsonb, integer } from '@/server/drizzle'

export const reports = pgTable('reports', {
  id: uuid().primaryKey().defaultRandom().notNull(),
  name: varchar({ length: 256 }).notNull(),
  slug: varchar({ length: 256 }).notNull().unique(),
  metadata: jsonb().notNull(),
  user_id: varchar({ length: 256 }).notNull(),
  timestamp: timestamp({ mode: 'date' }).notNull().defaultNow()
})

export type ReportSelect = typeof reports.$inferSelect
export type ReportInsert = typeof reports.$inferInsert

export const metrics = pgTable('metrics', {
  id: uuid().primaryKey().defaultRandom().notNull(),
  year: integer().notNull(),
  total: integer().notNull(),
  month: integer().notNull(),
  timestamp: timestamp({ mode: 'date' }).notNull().defaultNow()
})

export type MetricSelect = typeof metrics.$inferSelect
export type MetricInsert = typeof metrics.$inferInsert

export const activities = pgTable('activities', {
  id: uuid().primaryKey().defaultRandom().notNull(),
  type: varchar({ length: 256 }).notNull(),
  description: varchar({ length: 256 }).notNull().unique(),
  user_id: varchar({ length: 256 }).notNull(),
  device: varchar({ length: 256 }).notNull(),
  timestamp: timestamp({ mode: 'date' }).notNull().defaultNow()
})

export type ActivitySelect = typeof activities.$inferSelect
export type ActivityInsert = typeof activities.$inferInsert

const schema = { reports, metrics, activities }

export default schema
