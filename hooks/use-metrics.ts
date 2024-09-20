import { useState, useEffect } from 'react'
import { isEmpty } from 'lodash'

import { useReport } from '@/hooks/use-report'

const useMetrics = ({ reportSlug }: { reportSlug: string }) => {
  const [metrics, setMetrics] = useState<Record<string, any>>()
  const { report } = useReport({ reportSlug })

  useEffect(() => {
    if (!isEmpty(report)) setMetrics(report?.drowser?.metrics)
  }, [report])

  return { metrics }
}

export { useMetrics }
