import { NextApiRequest } from 'next'

import { getDeviceType } from '@/lib/utils'

export async function GET(request: NextApiRequest) {
  try {
    const agent = request.headers['user-agent'] || ''
    const device = getDeviceType(agent as string)
    const data = { device }

    return new Response(JSON.stringify(data), { status: 200 })
  } catch (err) {
    return new Response(
      JSON.stringify({ error: `An error occurred while retrieving device type: ${err}` }),
      {
        status: 500
      }
    )
  }
}
