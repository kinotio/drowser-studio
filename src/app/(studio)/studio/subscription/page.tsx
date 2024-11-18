'use client'

import { useState } from 'react'
import { Check, Zap } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

const user = {
  name: 'John Doe',
  email: 'john@example.com',
  currentPlan: 'basic'
}

const plans = [
  { name: 'Basic', price: 9.99, features: ['1 User', '5 Projects', '5GB Storage'] },
  {
    name: 'Pro',
    price: 19.99,
    features: ['5 Users', '20 Projects', '50GB Storage', 'Priority Support']
  }
]

export default function SubscriptionPage() {
  const [currentPlan, setCurrentPlan] = useState(user.currentPlan)

  const upgradePlan = (planName: string) => {
    console.log(`Upgrading to ${planName} plan`)
    setCurrentPlan(planName.toLowerCase())
  }

  return (
    <div className='mx-auto px-4 pt-4 pb-8 flex flex-col gap-6'>
      <div className='flex justify-between items-center w-full'>
        <Badge variant='secondary' className='flex gap-2'>
          <Zap size={20} />
          <span className='text-xl font-bold'>Subscription</span>
        </Badge>
      </div>

      <Card className='mb-8'>
        <CardHeader>
          <CardTitle>Current Plan</CardTitle>
          <CardDescription>You are currently on the {currentPlan} plan</CardDescription>
        </CardHeader>
        <CardContent>
          <p>
            <strong>Name:</strong> {user.name}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
        </CardContent>
      </Card>

      <div>
        <h2 className='text-2xl font-semibold mb-4'>Available Plans</h2>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className={`flex flex-col ${
                currentPlan === plan.name.toLowerCase() ? 'border-primary' : ''
              }`}
            >
              <CardHeader>
                <CardTitle className='flex justify-between items-center'>
                  {plan.name}
                  {currentPlan === plan.name.toLowerCase() && (
                    <Badge variant='default'>Current Plan</Badge>
                  )}
                </CardTitle>
                <CardDescription>
                  <span className='text-3xl font-bold'>${plan.price}</span> / month
                </CardDescription>
              </CardHeader>
              <CardContent className='flex-grow'>
                <ul className='space-y-2'>
                  {plan.features.map((feature, index) => (
                    <li key={index} className='flex items-center'>
                      <Check className='mr-2 h-4 w-4 text-green-500' />
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter className='mt-auto'>
                <Button
                  className='w-full'
                  onClick={() => upgradePlan(plan.name)}
                  disabled={currentPlan === plan.name.toLowerCase()}
                >
                  {currentPlan === plan.name.toLowerCase() ? 'Current Plan' : 'Upgrade'}
                  {currentPlan !== plan.name.toLowerCase() && <Zap className='ml-2 h-4 w-4' />}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
