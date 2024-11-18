import Stripe from 'stripe'
import { loadStripe } from '@stripe/stripe-js'

export const initializeStripe = async () => {
  return await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
