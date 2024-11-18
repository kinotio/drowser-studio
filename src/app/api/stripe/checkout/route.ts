import { stripe } from '@/lib/stripe'

export const POST = async (req: Request) => {
  const payload = await req.json()

  const planId = payload.planId
  const priceId = payload.priceId
  const userId = payload.userId

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'subscription',
      line_items: [
        {
          price: priceId,
          quantity: 1
        }
      ],
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/studio`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/subscription`,
      metadata: { planId, userId, priceId }
    })

    return new Response(JSON.stringify({ id: session.id, url: session.url }), { status: 200 })
  } catch (err) {
    return new Response(`An error occurred while processing checkout on server : ${err}`, {
      status: 500
    })
  }
}