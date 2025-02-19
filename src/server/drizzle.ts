import 'dotenv/config'
import { drizzle as pg } from 'drizzle-orm/node-postgres'
import { eq, like, and, count, desc, sql } from 'drizzle-orm'
import {
  pgTable,
  varchar,
  uuid,
  boolean,
  timestamp,
  integer,
  serial,
  jsonb
} from 'drizzle-orm/pg-core'
import schema from '@/server/db/schema'

export const drizzle = pg(process.env.DATABASE_URL, {
  logger: process.env.NODE_ENV === 'production' ? false : true,
  schema
})

export {
  eq,
  pgTable,
  varchar,
  uuid,
  boolean,
  timestamp,
  integer,
  serial,
  jsonb,
  like,
  and,
  count,
  desc,
  sql
}
