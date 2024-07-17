import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { deleteCookie } from 'cookies-next'

import { useStore } from '@/hooks/use-store'
import { useReportStore } from '@/hooks/use-report-store'

import { TDrowserReport } from '@/lib/definitions'

const useReport = () => {
  const report = useStore(useReportStore, (state) => state.content) as string

  const router = useRouter()

  const [content, setContent] = useState<TDrowserReport>()

  useEffect(() => {
    if (report && report !== '') {
      try {
        const parsedJson = JSON.parse(report)
        setContent(parsedJson)
      } catch (error) {
        deleteCookie('active-session')
        router.push('/')
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [report])

  return { content }
}

export { useReport }
