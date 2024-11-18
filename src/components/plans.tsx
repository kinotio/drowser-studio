'use client'

import { useEffect, useState } from 'react'
import { Check } from 'lucide-react'
import { SignUpButton, SignedOut, SignedIn } from '@clerk/nextjs'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Skeleton } from '@components/ui/skeleton'
import { Button } from '@/components/ui/button'
import { SubsButton } from '@/components/subs-button'

import { pocketbase } from '@/lib/pocketbase'
import { Plan } from '@/lib/definitions'

export const Plans = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [plans, setPlans] = useState<Plan[]>([])

  useEffect(() => {
    pocketbase
      .collection('plans')
      .getList(1, 3)
      .then((data) => setPlans(data.items as Plan[]))
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false))
  }, [])

  return (
    <section className='container mx-auto py-10'>
      <div className='text-center mb-10'>
        <h2 className='text-3xl font-bold mb-2' id='plans'>
          Flexible Plans for Every Need
        </h2>
        <p className='text-xl text-muted-foreground'>
          Choose the perfect plan to power your projects. Scale as you grow.
        </p>
      </div>
      <div className='grid md:grid-cols-2 gap-6 w-2/4 m-auto'>
        {isLoading ? (
          <>
            <Skeleton className='w-full h-[425px] rounded-md' />
            <Skeleton className='w-full h-[425px] rounded-md' />
          </>
        ) : (
          <>
            {plans.map((plan) => (
              <Card key={plan.id} className='w-full flex flex-col'>
                <CardHeader>
                  <CardTitle className='text-2xl'>{plan.name}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                </CardHeader>
                <CardContent className='flex-grow'>
                  <p className='text-4xl font-bold mb-4'>
                    {new Intl.NumberFormat('en-US', {
                      style: 'currency',
                      currency: 'USD'
                    }).format(plan.price)}
                    <span className='text-xl font-normal'>/{plan.duration}</span>
                  </p>
                  <ul className='space-y-2'>
                    {plan.metadata.features.map((feat, idx) => (
                      <li key={idx} className='flex items-center'>
                        <Check className='mr-2 h-4 w-4 text-green-500' />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter className='mt-auto'>
                  <SignedOut>
                    <SignUpButton>
                      <Button className='w-full'>Get Started</Button>
                    </SignUpButton>
                  </SignedOut>

                  <SignedIn>
                    <SubsButton planId={plan.id} priceId={plan.price_id} />
                  </SignedIn>
                </CardFooter>
              </Card>
            ))}
          </>
        )}
      </div>
    </section>
  )
}
