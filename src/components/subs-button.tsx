'use client'

import axios from 'axios'
import { useAuth } from '@clerk/nextjs'

import { Button } from '@/components/ui/button'

import { initializeStripe } from '@/lib/stripe'

export const SubsButton = ({ priceId }: { priceId: string }) => {
  const { userId } = useAuth()

  const handleSubmit = () => {
    initializeStripe().then((stripe) => {
      if (!stripe) return

      axios
        .post('/api/stripe/checkout', { priceId, userId })
        .then(({ data }) => {
          stripe.redirectToCheckout({ sessionId: data.id })
        })
        .catch((err) => console.log(err))
    })
  }

  return (
    <Button onClick={handleSubmit} className='w-full'>
      Subscribe
    </Button>
  )
}
