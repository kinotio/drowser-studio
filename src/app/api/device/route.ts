import { getDeviceType } from '@/lib/utils'

export const GET = async (req: Request) => {
  try {
    const agent = req.headers.get('user-agent') || ''
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
