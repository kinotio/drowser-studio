import { headers } from 'next/headers'

import { stripe } from '@/lib/stripe'
import { pocketbase } from '@/lib/pocketbase'

export const POST = async (req: Request) => {
  const STRIPE_WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET

  if (!STRIPE_WEBHOOK_SECRET) {
    throw new Error('Please add STRIPE_WEBHOOK_SECRET from Stripe Dashboard to .env')
  }

  const headerPayload = headers()
  const sig = headerPayload.get('stripe-signature') as string
  const body = await req.text()

  try {
    const evt = await stripe.webhooks.constructEventAsync(body, sig, STRIPE_WEBHOOK_SECRET)

    switch (evt.type) {
      case 'checkout.session.completed':
        const { metadata } = evt.data.object
        pocketbase
          .collection('subs')
          .create({ user_id: metadata?.userId, plan_id: metadata?.planId })
        break
      default:
        console.log(`Unhandled event type ${evt.type}`)
    }

    new Response('Stripe webhooks trigger end')
  } catch (err) {
    return new Response(`An error occurred while processing webhooks on server : ${err}`, {
      status: 500
    })
  }
}
