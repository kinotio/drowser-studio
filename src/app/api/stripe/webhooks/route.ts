import { headers } from 'next/headers'

import { stripe } from '@/lib/stripe'
import { pocketbase } from '@/lib/pocketbase'
import Stripe from 'stripe'

export const POST = async (req: Request) => {
  const STRIPE_WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET

  if (!STRIPE_WEBHOOK_SECRET) {
    throw new Error('Please add STRIPE_WEBHOOK_SECRET from Stripe Dashboard to .env')
  }

  const headerPayload = headers()
  const sig = headerPayload.get('stripe-signature') as string
  const body = await req.text()

  let evt: Stripe.Event

  try {
    evt = stripe.webhooks.constructEvent(body, sig, STRIPE_WEBHOOK_SECRET) as Stripe.Event
  } catch (err) {
    return new Response(`An error occurred while verifying webhook : ${err}`, {
      status: 400
    })
  }

  if (evt.type === 'checkout.session.completed') {
    const { metadata } = evt.data.object
    await pocketbase
      .collection('subs')
      .create({ user_id: metadata?.userId, plan_id: metadata?.planId })
  }

  return new Response('Stripe webhooks handled successfully')
}
