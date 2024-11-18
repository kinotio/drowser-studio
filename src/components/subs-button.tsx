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

      axios.post('/api/stripe/checkout', { priceId, userId }).then(({ data }) => {
        if (!data.ok) {
          console.log('An error occurred while processing stripe checkout')
          return
        }

        stripe.redirectToCheckout({ sessionId: data.result.id })
      })
    })
  }

  return (
    <Button onClick={handleSubmit} className='w-full'>
      Subscribe
    </Button>
  )
}
