import { drizzle } from '@/server/drizzle'
import { plans } from '@/server/db/schema'

const seed = (async () => {
  const data = [
    {
      name: 'Free',
      description: 'Free plan with limited features.',
      duration: 'lifetime',
      price: 0,
      type: 'free'
    },
    {
      name: 'Basic',
      description: 'Basic plan with additional features.',
      duration: 'monthly',
      price: 9,
      type: 'basic'
    },
    {
      name: 'Pro',
      description: 'Pro plan with all features.',
      duration: 'monthly',
      price: 19,
      type: 'pro'
    }
  ]

  for (const plan of data) {
    await drizzle.insert(plans).values(plan)
  }
})()

export default seed
