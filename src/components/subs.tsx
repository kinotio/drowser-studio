'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@clerk/nextjs'

import { Badge } from '@components/ui/badge'

import { pocketbase } from '@/lib/pocketbase'
import { Plan, Subscription } from '@/lib/definitions'

export const Subs = () => {
  const { userId } = useAuth()

  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [plan, setPlan] = useState<Plan>()

  useEffect(() => {
    pocketbase
      .collection('subs')
      .getFirstListItem<Subscription>('', { filter: `user_id = "${userId}"` })
      .then((data) => {
        const planId = data.plan_id
        pocketbase
          .collection('plans')
          .getFirstListItem('', { filter: `id = "${planId}"` })
          .then((data) => setPlan(data as Plan))
          .catch((err) => console.log(err))
          .finally(() => setIsLoading(false))
      })
      .catch((err) => console.log(err))
  }, [userId])

  return (
    <>
      {!isLoading && (
        <Badge variant={'outline'} className='h-8 text-green-500 border-green-500'>
          {plan?.name}
        </Badge>
      )}
    </>
  )
}
