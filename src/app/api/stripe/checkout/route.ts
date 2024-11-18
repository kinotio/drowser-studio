import { stripe } from '@/lib/stripe'

export const POST = async (req: Request) => {
  const payload = await req.json()

  const priceId = payload.priceId
  const userId = payload.userId

  stripe.checkout.sessions
    .create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1
        }
      ],
      mode: 'payment',
      success_url: `${process.env.NEXT_BASE_URL}/billing`,
      cancel_url: `${process.env.NEXT_BASE_URL}/billing`,
      metadata: { userId, priceId }
    })
    .then((session) => {
      return new Response(JSON.stringify({ result: session }), { status: 200 })
    })
    .catch(() => {
      return new Response('An error occurred while processing checkout on server', { status: 400 })
    })
}
