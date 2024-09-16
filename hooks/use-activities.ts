'use client'

import { useState, useEffect } from 'react'

import { ActivityType } from '@/lib/definitions'
import { supabase } from '@/lib/supabase/client'

import { useRealtime } from '@/hooks/use-realtime'

export const useActivities = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [message, setMessage] = useState<string>('')
  const [activities, setActivities] = useState<ActivityType[]>([])
  const [total, setTotal] = useState<number>(0)

  const { newData } = useRealtime<ActivityType>({ table: 'activities' })

  useEffect(() => {
    if (newData) setActivities((prevActivities) => [newData, ...(prevActivities || [])])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newData])

  const list = async ({
    currentPage = 1,
    perPage = 6
  }: {
    currentPage?: number
    perPage?: number
  }) => {
    setLoading(true)

    const {
      data: { user },
      error
    } = await supabase.auth.getUser()

    if (error) {
      setMessage(error.message)
      return
    }

    supabase
      .from('activities')
      .select('id, type, description, device, timestamp', { count: 'exact' })
      .eq('user_id', user?.id)
      .order('timestamp', { ascending: false })
      .range((currentPage - 1) * perPage, currentPage * perPage - 1)
      .then(({ data, error, count }) => {
        if (error) {
          setMessage(error.message)
          setLoading(false)
        }

        setActivities(data as ActivityType[])
        setTotal(count as number)
        setLoading(false)
      })
  }

  return { loading, activities, total, message, list }
}
