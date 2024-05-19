'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { isEmpty } from 'lodash'
import { BarChartBigIcon } from 'lucide-react'

import useStore from '@/stores/useStore'
import useReportStore from '@/stores/useReportStore'

import { TContentCase } from '@/types'

import MetricsComponent from '@/components/dashboard/metrics-component'
import TableComponent from '@/components/dashboard/table-component'

export default function Case() {
  const report = useStore(useReportStore, (state) => state.content)

  const { id } = useParams()

  const [content, setContent] = useState<TContentCase>()

  useEffect(() => {
    try {
      setContent(JSON.parse(report as string)?.drowser.cases.filter((c: any) => c.id === id)[0])
    } catch (error) {}
  }, [id, report])

  return (
    <div>
      {!isEmpty(content) ? (
        <main className='flex flex-col gap-4 p-4 md:gap-8 md:p-6'>
          <MetricsComponent content={content} />
          <TableComponent content={content} />
        </main>
      ) : (
        <div className='border rounded-lg w-full h-full flex items-center justify-center p-12'>
          <div className='text-center space-y-4'>
            <BarChartBigIcon className='h-12 w-12 text-gray-500' />
            <h2 className='text-2xl font-bold'>No Metrics Available</h2>
            <p className='text-gray-500'>
              It looks like there are no metrics to display at the moment. Please provide a verified
              or conform json configuration form the <strong>Drowser</strong> package
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
