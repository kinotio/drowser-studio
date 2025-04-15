import { varchar, pgTable, uuid, timestamp, jsonb, integer } from 'drizzle-orm/pg-core'

// Common Columns
const baseColumns = {
  created: timestamp({ withTimezone: true }).notNull().defaultNow(),
  updated: timestamp({ withTimezone: true })
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date())
}

export const users = pgTable('users', {
  id: varchar({ length: 256 }).primaryKey().notNull(),
  email: varchar({ length: 256 }).notNull(),
  first_name: varchar({ length: 256 }).notNull(),
  last_name: varchar({ length: 256 }).notNull(),
  ...baseColumns
})

export const reports = pgTable('reports', {
  id: uuid().primaryKey().defaultRandom().notNull(),
  name: varchar({ length: 256 }).notNull(),
  slug: varchar({ length: 256 }).notNull().unique(),
  metadata: jsonb().notNull(),
  user_id: varchar()
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  ...baseColumns
})

export const metrics = pgTable('metrics', {
  id: uuid().primaryKey().defaultRandom().notNull(),
  year: integer().notNull(),
  total: integer().notNull(),
  month: integer().notNull(),
  user_id: varchar()
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  ...baseColumns
})

export const logs = pgTable('logs', {
  id: uuid().primaryKey().defaultRandom().notNull(),
  type: varchar({ length: 256 }).notNull(),
  description: varchar({ length: 256 }).notNull(),
  user_id: varchar()
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  device: varchar({ length: 256 }).notNull(),
  ...baseColumns
})
