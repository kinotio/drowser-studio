import { createClerkClient } from '@clerk/nextjs/server'
export const client = createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY })
