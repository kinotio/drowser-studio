import { varchar, pgTable, uuid, timestamp, jsonb, integer } from '@/server/drizzle'

export const reports = pgTable('reports', {
  id: uuid().primaryKey().defaultRandom().notNull(),
  name: varchar({ length: 256 }).notNull(),
  slug: varchar({ length: 256 }).notNull().unique(),
  metadata: jsonb().notNull(),
  user_id: varchar({ length: 256 }).notNull(),
  created: timestamp({ mode: 'date' }).notNull().defaultNow(),
  updated: timestamp({ mode: 'date' })
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date())
})

export const metrics = pgTable('metrics', {
  id: uuid().primaryKey().defaultRandom().notNull(),
  year: integer().notNull(),
  total: integer().notNull(),
  month: integer().notNull(),
  user_id: varchar({ length: 256 }).notNull(),
  created: timestamp({ mode: 'date' }).notNull().defaultNow(),
  updated: timestamp({ mode: 'date' })
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date())
})

export const activities = pgTable('activities', {
  id: uuid().primaryKey().defaultRandom().notNull(),
  type: varchar({ length: 256 }).notNull(),
  description: varchar({ length: 256 }).notNull(),
  user_id: varchar({ length: 256 }).notNull(),
  device: varchar({ length: 256 }).notNull(),
  created: timestamp({ mode: 'date' }).notNull().defaultNow(),
  updated: timestamp({ mode: 'date' })
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date())
})

const schema = { reports, metrics, activities }

export default schema
