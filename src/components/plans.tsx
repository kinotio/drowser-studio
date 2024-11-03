'use client'

import { useEffect, useState } from 'react'
import { Check } from 'lucide-react'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Skeleton } from './ui/skeleton'

import { pocketbase } from '@/lib/pocketbase'

type Plan = {
  collectionId: string
  collectionName: string
  created: string
  description: string
  duration: string
  id: string
  metadata: { options: string[] }
  name: string
  price: number
  type: string
  updated: string
}

export const Plans = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [plans, setPlans] = useState<Plan[]>([])

  useEffect(() => {
    pocketbase
      .collection('plans')
      .getList(1, 3, { requestKey: null })
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
      <div className='grid md:grid-cols-3 gap-6'>
        {isLoading ? (
          <>
            <Skeleton className='w-full h-[425px] rounded-md' />
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
                  {plan.type === 'entreprise' ? (
                    <p className='text-4xl font-bold mb-4'>
                      Custom<span className='text-xl font-normal'>/pricing</span>
                    </p>
                  ) : (
                    <p className='text-4xl font-bold mb-4'>
                      {`$${plan.price}`}
                      <span className='text-xl font-normal'>/{plan.duration}</span>
                    </p>
                  )}
                  <ul className='space-y-2'>
                    {plan.metadata.options.map((opt, idx) => (
                      <li key={idx} className='flex items-center'>
                        <Check className='mr-2 h-4 w-4 text-green-500' />
                        <span>{opt}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                {plan.type === 'entreprise' ? (
                  <CardFooter className='mt-auto'>
                    <Button className='w-full'>Contact Sales</Button>
                  </CardFooter>
                ) : (
                  <CardFooter className='mt-auto'>
                    <Button className='w-full'>Get Started</Button>
                  </CardFooter>
                )}
              </Card>
            ))}
          </>
        )}
      </div>
    </section>
  )
}
