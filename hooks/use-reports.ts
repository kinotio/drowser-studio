import { useState, useEffect } from 'react'
import { isEmpty } from 'lodash'

import { supabase } from '@/lib/supabase/client'
import { Report } from '@/lib/definitions'

import { useRealtime } from '@/hooks/use-realtime'

const useReports = () => {
  const [reports, setReports] = useState<Report[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  const { newData } = useRealtime<Report>({ table: 'reports' })

  useEffect(() => {
    if (newData) setReports((prevReports) => [newData, ...(prevReports || [])])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newData])

  useEffect(() => {
    const fetchReports = async () => {
      setLoading(true)

      try {
        const {
          data: { user }
        } = await supabase.auth.getUser()

        const query = 'id, name, slug, metadata, created_at'

        const { data, error } = await supabase.from('reports').select(query).eq('user_id', user?.id)

        if (!isEmpty(error)) {
          setError(error.message)
          return { error: error.message }
        }

        setReports(data as Report[])
      } finally {
        setLoading(false)
      }
    }

    fetchReports()
  }, [])

  return { reports, loading, error }
}

export { useReports }
