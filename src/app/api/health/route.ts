import { env } from 'process'

const startTime = Date.now()

export const GET = () => {
  const healthInfo = {
    status: 'healthy',
    environment: env.NODE_ENV,
    uptime: Math.floor((Date.now() - startTime) / 1000),
    timestamp: new Date().toISOString()
  }

  return new Response(JSON.stringify(healthInfo), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  })
}
