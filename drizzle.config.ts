import 'dotenv/config'
import { defineConfig, type Config } from 'drizzle-kit'

export default defineConfig({
  out: './src/server/databases/migrations',
  schema: './src/server/databases/schema.ts',
  dialect: 'postgresql',
  dbCredentials: { url: process.env.DATABASE_URL }
}) satisfies Config
