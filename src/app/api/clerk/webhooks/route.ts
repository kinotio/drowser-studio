import { Webhook } from 'svix'
import { headers } from 'next/headers'
import { WebhookEvent } from '@clerk/nextjs/server'

import { pocketbase } from '@/lib/pocketbase'
import { getDeviceType } from '@/lib/utils'

export const POST = async (req: Request) => {
  const CLERK_WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET

  if (!CLERK_WEBHOOK_SECRET) {
    throw new Error('Please add CLERK_WEBHOOK_SECRET from Clerk Dashboard to .env')
  }

  const headerPayload = headers()
  const svix_id = headerPayload.get('svix-id')
  const svix_timestamp = headerPayload.get('svix-timestamp')
  const svix_signature = headerPayload.get('svix-signature')

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Error occured -- no svix headers', {
      status: 400
    })
  }

  const payload = await req.json()
  const body = JSON.stringify(payload)

  const wh = new Webhook(CLERK_WEBHOOK_SECRET)

  let evt: WebhookEvent

  try {
    evt = wh.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature
    }) as WebhookEvent
  } catch (err) {
    console.error('Error verifying webhook:', err)
    return new Response('Error occured', {
      status: 400
    })
  }

  if (evt.type === 'user.created') {
    const activity = {
      type: 'account_created',
      description: 'User account created',
      user_id: evt.data.id,
      device: getDeviceType(req.headers.get('user-agent') || '')
    }
    pocketbase.collection('activities').create(activity, { requestKey: null })
    pocketbase
      .collection('plans')
      .getFirstListItem('', { filter: `type = "free"`, requestKey: null })
      .then((data) => {
        const planId = data.id
        const sub = { user_id: evt.data.id, plan_id: planId }
        pocketbase.collection('subs').create(sub, { requestKey: null })
      })
  }

  if (evt.type === 'session.created') {
    const activity = {
      type: 'login',
      description: 'Account logged in',
      user_id: evt.data.user_id,
      device: getDeviceType(req.headers.get('user-agent') || '')
    }
    pocketbase.collection('activities').create(activity, { requestKey: null })
  }

  if (evt.type === 'session.removed') {
    const activity = {
      type: 'logout',
      description: 'Account logged out',
      user_id: evt.data.user_id,
      device: getDeviceType(req.headers.get('user-agent') || '')
    }
    pocketbase.collection('activities').create(activity, { requestKey: null })
  }

  return new Response('', { status: 200 })
}
