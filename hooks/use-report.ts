import { useState, useEffect } from 'react'
import { isEmpty } from 'lodash'

import { supabase } from '@/lib/supabase/client'
import { TDrowserReport } from '@/lib/definitions'

const useReport = ({ reportId }: { reportId: string }) => {
  const [report, setReport] = useState<TDrowserReport>()
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchReport = async () => {
      setLoading(true)

      try {
        const {
          data: { user }
        } = await supabase.auth.getUser()

        const { data, error } = await supabase
          .from('reports')
          .select('*')
          .eq('user_id', user?.id)
          .eq('id', reportId)
          .limit(1)

        if (!isEmpty(error)) {
          setError(error.message)
          return { error: error.message }
        }

        const report = data?.[0]

        setReport(report.metadata as TDrowserReport)
      } finally {
        setLoading(false)
      }
    }

    fetchReport()
  }, [reportId])

  return { report, loading, error }
}

export { useReport }
