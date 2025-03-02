import { Webhook } from 'svix'
import { headers } from 'next/headers'
import { WebhookEvent } from '@clerk/nextjs/server'

import { getDeviceType } from '@/lib/utils'

import { saveLog } from '@/server/actions/log'
import { saveUser, updateUser, deleteUser } from '@/server/actions/user'
import { saveSubscription } from '@/server/actions/subscriptions'
import { getFreePlan } from '@/server/actions/plan'

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
    return new Response('An error occurred while getting svix headers', {
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
    return new Response(`An error occurred while verifying webhook : ${err}`, {
      status: 400
    })
  }

  if (evt.type === 'user.created') {
    await saveUser({
      id: evt.data.id,
      email: evt.data.email_addresses[0].email_address,
      firstName: evt.data.first_name as string,
      lastName: evt.data.last_name as string
    })

    const freePlan = await getFreePlan()

    await saveSubscription({
      userId: evt.data.id as string,
      planId: freePlan[0].id,
      status: 'active',
      startDate: new Date()
    })

    await saveLog({
      type: 'account_created',
      description: 'User account created',
      userId: evt.data.id as string,
      device: getDeviceType(req.headers.get('user-agent') || '')
    })
  }

  if (evt.type === 'user.updated') {
    await updateUser({
      id: evt.data.id,
      email: evt.data.email_addresses[0].email_address,
      firstName: evt.data.first_name as string,
      lastName: evt.data.last_name as string
    })
  }

  if (evt.type === 'user.deleted') {
    await deleteUser({ userId: evt.data.id as string })

    await saveLog({
      type: 'account_deleted',
      description: 'User account deleted',
      userId: evt.data.id as string,
      device: getDeviceType(req.headers.get('user-agent') || '')
    })
  }

  if (evt.type === 'session.created') {
    await saveLog({
      type: 'login',
      description: 'Account logged in',
      userId: evt.data.user_id as string,
      device: getDeviceType(req.headers.get('user-agent') || '')
    })
  }

  if (evt.type === 'session.removed') {
    await saveLog({
      type: 'logout',
      description: 'Account logged out',
      userId: evt.data.user_id as string,
      device: getDeviceType(req.headers.get('user-agent') || '')
    })
  }

  return new Response('Clerk webhooks handled successfully', { status: 200 })
}
