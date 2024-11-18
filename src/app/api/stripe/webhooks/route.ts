import { headers } from 'next/headers'

import { stripe } from '@/lib/stripe'

export const POST = async (req: Request) => {
  const STRIPE_WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET

  if (!STRIPE_WEBHOOK_SECRET) {
    throw new Error('Please add STRIPE_WEBHOOK_SECRET from Stripe Dashboard to .env')
  }

  const headerPayload = headers()
  const sig = headerPayload.get('stripe-signature') as string
  const body = await req.text()

  const evt = stripe.webhooks.constructEvent(body, sig, STRIPE_WEBHOOK_SECRET)

  console.log(evt.type)

  return new Response('Event Received', { status: 200 })
}
