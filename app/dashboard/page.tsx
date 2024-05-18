'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'

import { isEmpty } from 'lodash'

import useReportStore from '@/stores/useReportStore'

import { TContentCase } from '@/types'

import FullMetricsComponent from '@/components/dashboard/full-metrics-component'

export default function Dashboard() {
  const report = useReportStore((state) => state.content)

  const { id } = useParams()
  const router = useRouter()

  const [content, setContent] = useState<TContentCase>()

  useEffect(() => {
    if (isEmpty(report)) return router.push('/')
    setContent(JSON.parse(report)?.drowser.cases.filter((c: any) => c.id === id)[0])
  }, [id, report])

  return (
    <>
      <FullMetricsComponent content={content} />
    </>
  )
}
