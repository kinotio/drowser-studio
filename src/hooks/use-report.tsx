import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { useAuth } from '@clerk/nextjs'

import { Report } from '@/server/databases/types'
import { getReport } from '@/server/actions/report/get'

// Use Report type to ensure compatibility with new implementation
import { Metric } from '@/server/databases/types'

// Define a type for content cases
export type ContentCase = {
  id: string
  title: string
  content: string
}

export type ReportWithMetadata = Report & {
  metadata: {
    drowser?: {
      metrics?: Metric[]
      cases?: ContentCase[]
    }
  }
}

export const useReport = () => {
  const params = useParams()
  const { userId } = useAuth()

  const [report, setReport] = useState<ReportWithMetadata | undefined>()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  const paramsReportSlug = params.reportSlug as string

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const response = await getReport({ userId: userId as string, reportSlug: paramsReportSlug })
        
        if (response.success && response.data) {
          setReport(response.data as ReportWithMetadata)
        } else {
          throw new Error(response.error || 'Failed to fetch report')
        }
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
