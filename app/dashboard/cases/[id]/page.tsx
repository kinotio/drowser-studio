'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'

import { isEmpty } from 'lodash'

import useReportStore from '@/stores/useReportStore'

import { TContentCase } from '@/types'

import MetricsComponent from '@/components/dashboard/metrics-component'
import TableComponent from '@/components/dashboard/table-component'

export default function Case() {
  const report = useReportStore((state) => state.content)

  const { id } = useParams()
  const router = useRouter()

  const [content, setContent] = useState<TContentCase>()

  useEffect(() => {
    if (isEmpty(report)) return router.push('/')
    setContent(JSON.parse(report)?.drowser.cases.filter((c: any) => c.id === id)[0])
  }, [id, report])

  return (
    <main className='flex flex-col gap-4 p-4 md:gap-8 md:p-6'>
      <MetricsComponent content={content} />
      <TableComponent content={content} />
    </main>
  )
}
