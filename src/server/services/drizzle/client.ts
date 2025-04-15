import 'dotenv/config'
import { drizzle } from 'drizzle-orm/node-postgres'
import { Pool } from 'pg'

import { config } from '@/server/services/drizzle/config'
import * as schema from '@/server/databases/schema'

const pool = new Pool(config)

export const database = drizzle(pool, {
  logger: process.env.NODE_ENV === 'development',
  schema
})
