import { useState, useEffect } from 'react'
import { isEmpty } from 'lodash'

import { useReport } from '@/hooks/use-report'

const useMetrics = () => {
  const [metrics, setMetrics] = useState<Record<string, any>>()
  const { content } = useReport()

  useEffect(() => {
    if (!isEmpty(content)) setMetrics(content?.drowser?.metrics)
  }, [content])

  return { metrics }
}

export { useMetrics }
