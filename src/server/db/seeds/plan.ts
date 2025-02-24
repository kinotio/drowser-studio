import { drizzle } from '@/server/drizzle'
import { plans } from '@/server/db/schema'

const seed = async () => {
  const data = [
    {
      name: 'Free',
      description: 'Free plan with limited features.',
      duration: '1 month',
      price: 0,
      type: 'free'
    },
    {
      name: 'Basic',
      description: 'Basic plan with additional features.',
      duration: '1 month',
      price: 9,
      type: 'basic'
    },
    {
      name: 'Pro',
      description: 'Pro plan with all features.',
      duration: '1 month',
      price: 19,
      type: 'pro'
    }
  ]

  for (const plan of data) {
    await drizzle.insert(plans).values(plan)
  }
}

export default seed
