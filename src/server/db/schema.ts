import { varchar, pgTable, uuid, timestamp, jsonb, integer } from '@/server/drizzle'

export const users = pgTable('users', {
  id: varchar({ length: 256 }).primaryKey().notNull(),
  email: varchar({ length: 256 }).notNull(),
  first_name: varchar({ length: 256 }).notNull(),
  last_name: varchar({ length: 256 }).notNull(),
  created: timestamp({ withTimezone: true }).notNull().defaultNow(),
  updated: timestamp({ withTimezone: true })
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date())
})

export const reports = pgTable('reports', {
  id: uuid().primaryKey().defaultRandom().notNull(),
  name: varchar({ length: 256 }).notNull(),
  slug: varchar({ length: 256 }).notNull().unique(),
  metadata: jsonb().notNull(),
  user_id: varchar()
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  created: timestamp({ withTimezone: true }).notNull().defaultNow(),
  updated: timestamp({ withTimezone: true })
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date())
})

export const metrics = pgTable('metrics', {
  id: uuid().primaryKey().defaultRandom().notNull(),
  year: integer().notNull(),
  total: integer().notNull(),
  month: integer().notNull(),
  user_id: varchar()
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  created: timestamp({ withTimezone: true }).notNull().defaultNow(),
  updated: timestamp({ withTimezone: true })
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date())
})

export const logs = pgTable('logs', {
  id: uuid().primaryKey().defaultRandom().notNull(),
  type: varchar({ length: 256 }).notNull(),
  description: varchar({ length: 256 }).notNull(),
  user_id: varchar()
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  device: varchar({ length: 256 }).notNull(),
  created: timestamp({ withTimezone: true }).notNull().defaultNow(),
  updated: timestamp({ withTimezone: true })
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date())
})

export const plans = pgTable('plans', {
  id: uuid().primaryKey().defaultRandom().notNull(),
  name: varchar({ length: 256 }).notNull(),
  description: varchar({ length: 256 }).notNull(),
  duration: varchar({ length: 256 }).notNull().default('monthly'),
  price: integer().notNull(),
  price_id: varchar({ length: 256 }),
  metadata: jsonb(),
  type: varchar({ length: 256 }).notNull().unique(),
  created: timestamp({ withTimezone: true }).notNull().defaultNow(),
  updated: timestamp({ withTimezone: true })
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date())
})

export const subscriptions = pgTable('subscriptions', {
  id: uuid().primaryKey().defaultRandom().notNull(),
  user_id: varchar()
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  plan_id: varchar({ length: 256 }).notNull(),
  status: varchar({ length: 256 }).notNull().default('active'),
  start_date: timestamp({ withTimezone: true }).notNull().defaultNow(),
  end_date: timestamp({ withTimezone: true }),
  created: timestamp({ withTimezone: true }).notNull().defaultNow(),
  updated: timestamp({ withTimezone: true })
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date())
})

const schema = { reports, metrics, logs, users, plans, subscriptions }

export default schema
