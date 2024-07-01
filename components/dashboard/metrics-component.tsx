'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { isEmpty } from 'lodash'
import { BarChartBigIcon } from 'lucide-react'

import { CardTitle, CardDescription, CardHeader, Card } from '@/components/ui/card'

import { humanizeDuration } from '@/lib/utils'

import { TContentCase } from '@/lib/definitions'

import useStore from '@/hooks/use-store'
import useReportStore from '@/hooks/use-report-store'

export default function MetricsComponent() {
  const report = useStore(useReportStore, (state) => state.content)

  const { id } = useParams()

  const [content, setContent] = useState<TContentCase>()
  const [goupedByStatus, setGoupedByStatus] = useState<any>()

  useEffect(() => {
    try {
      setContent(JSON.parse(report as string)?.drowser.cases.filter((c: any) => c.id === id)[0])
    } catch (error) {}
  }, [id, report])

  useEffect(() => {
    if (!isEmpty(content)) {
      setGoupedByStatus(Object.groupBy(content?.cases, ({ status }: { status: string }) => status))
    }
  }, [content])

  return (
    <>
      {!isEmpty(content) ? (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          <Card>
            <CardHeader>
              <CardTitle>Total Tests</CardTitle>
              <CardDescription>
                <span className='text-4xl font-bold'>{content?.cases?.length ?? 0}</span>
              </CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Passing Tests</CardTitle>
              <CardDescription>
                <span className='text-4xl font-bold'>{goupedByStatus?.passed?.length ?? 0}</span>
              </CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Failed Tests</CardTitle>
              <CardDescription>
                <span className='text-4xl font-bold'>{goupedByStatus?.failed?.length ?? 0}</span>
              </CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Test Coverage</CardTitle>
              <CardDescription>
                <span className='text-4xl font-bold'>{`${content?.coverage?.toFixed() ?? 0}%`}</span>
              </CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Avg. Test Duration</CardTitle>
              <CardDescription>
                <span className='text-4xl font-bold'>
                  {humanizeDuration(content?.avg_duration as number) ?? 0}
                </span>
              </CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Flaky Tests</CardTitle>
              <CardDescription>
                <span className='text-4xl font-bold'>{content?.flaky ?? 0}</span>
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      ) : (
        <div className='border rounded-lg w-full h-full flex items-center justify-center p-12'>
          <div className='text-center space-y-4'>
            <BarChartBigIcon className='h-12 w-12 text-gray-500' />
            <h2 className='text-2xl font-bold'>No Metrics Available</h2>
            <p className='text-gray-500'>
              It looks like there are no metrics to display at the moment. Please provide a verified
              or conform json report form the <strong>Drowser</strong> package
            </p>
          </div>
        </div>
      )}
    </>
  )
}
