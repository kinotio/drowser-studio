import { varchar, pgTable, uuid, timestamp, jsonb, integer } from '@/lib/drizzle'

export const reports = pgTable('reports', {
  id: uuid().primaryKey().defaultRandom().notNull(),
  name: varchar({ length: 256 }).notNull(),
  slug: varchar({ length: 256 }).notNull().unique(),
  metadata: jsonb().notNull(),
  user_id: varchar({ length: 256 }).notNull(),
  timestamp: timestamp({ mode: 'date' }).notNull().defaultNow()
})

export type Report = typeof reports.$inferSelect

export const metrics = pgTable('metrics', {
  id: uuid().primaryKey().defaultRandom().notNull(),
  year: integer().notNull(),
  total: integer().notNull(),
  month: integer().notNull(),
  timestamp: timestamp({ mode: 'date' }).notNull().defaultNow()
})

export type Metric = typeof metrics.$inferSelect

export const activities = pgTable('activities', {
  id: uuid().primaryKey().defaultRandom().notNull(),
  type: varchar({ length: 256 }).notNull(),
  description: varchar({ length: 256 }).notNull().unique(),
  user_id: varchar({ length: 256 }).notNull(),
  device: varchar({ length: 256 }).notNull(),
  timestamp: timestamp({ mode: 'date' }).notNull().defaultNow()
})

export type Activity = typeof activities.$inferSelect

const schema = { reports, metrics, activities }

export default schema
