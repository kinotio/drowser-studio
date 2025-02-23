import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { useAuth } from '@clerk/nextjs'

import { ReportSelect } from '@/server/types'
import { getReport } from '@/server/actions/report'

export const useReport = () => {
  const params = useParams()
  const { userId } = useAuth()

  const [report, setReport] = useState<ReportSelect>()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  const paramsReportSlug = params.reportSlug as string

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const data = await getReport({ userId: userId as string, reportSlug: paramsReportSlug })
        setReport(data[0] as ReportSelect)
      } catch (err) {
        setError(err as Error)
      } finally {
        setLoading(false)
      }
    }

    if (paramsReportSlug && userId) fetchReport()
  }, [paramsReportSlug, userId])

  return { report, loading, error }
}
