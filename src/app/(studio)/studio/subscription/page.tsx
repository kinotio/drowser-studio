'use client'

import { useState, useEffect } from 'react'
import { Check, Zap } from 'lucide-react'
import { useAuth, useUser } from '@clerk/nextjs'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@components/ui/skeleton'
import { SubsButton } from '@/components/subs-button'

import { pocketbase } from '@/lib/pocketbase'
import { Plan, Subscription } from '@/lib/definitions'

const Page = () => {
  const { userId } = useAuth()
  const { user } = useUser()

  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [plans, setPlans] = useState<Plan[]>([])
  const [currentPlan, setCurrentPlan] = useState<Plan>()

  useEffect(() => {
    pocketbase
      .collection('plans')
      .getList(1, 3)
      .then((data) => setPlans(data.items as Plan[]))
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false))
  }, [])

  useEffect(() => {
    pocketbase
      .collection('subs')
      .getFirstListItem<Subscription>('', {
        filter: `user_id = "${userId}"`
      })
      .then(async (data) => {
        pocketbase
          .collection('plans')
          .getFirstListItem('', { filter: `id = "${data.plan_id}"` })
          .then((data) => setCurrentPlan(data as Plan))
      })
  }, [userId])

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
          <CardDescription>You are currently on the {currentPlan?.type} plan</CardDescription>
        </CardHeader>
        <CardContent>
          <p>
            <strong>Name:</strong> {user?.fullName}
          </p>
          <p>
            <strong>Email:</strong> {user?.emailAddresses[0].emailAddress}
          </p>
        </CardContent>
      </Card>

      <div>
        <h2 className='text-2xl font-semibold mb-4'>Available Plans</h2>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
          {isLoading ? (
            <>
              <Skeleton className='w-full h-[425px] rounded-md' />
              <Skeleton className='w-full h-[425px] rounded-md' />
            </>
          ) : (
            <>
              {plans.map((plan) => (
                <Card
                  key={plan.name}
                  className={`flex flex-col ${
                    currentPlan?.type === plan.type ? 'border-primary' : ''
                  }`}
                >
                  <CardHeader>
                    <CardTitle className='flex justify-between items-center'>
                      {plan.name}
                      {currentPlan?.type === plan.type && (
                        <Badge variant='default'>Current Plan</Badge>
                      )}
                    </CardTitle>
                    <CardDescription>
                      <span className='text-3xl font-bold'>${plan.price}</span> / month
                    </CardDescription>
                  </CardHeader>
                  <CardContent className='flex-grow'>
                    <ul className='space-y-2'>
                      {plan.metadata.features.map((feature, index) => (
                        <li key={index} className='flex items-center'>
                          <Check className='mr-2 h-4 w-4 text-green-500' />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter className='mt-auto'>
                    <SubsButton
                      planId={plan.id}
                      priceId={plan.price_id}
                      disabled={currentPlan?.type === plan.type}
                    >
                      {currentPlan?.type === plan.type
                        ? 'Current Plan'
                        : currentPlan?.type === 'pro'
                        ? ' Downgrade'
                        : 'Upgrade'}
                      {currentPlan?.type !== plan.type && <Zap className='ml-2 h-4 w-4' />}
                    </SubsButton>
                  </CardFooter>
                </Card>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default Page
