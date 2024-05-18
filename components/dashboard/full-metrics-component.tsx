'use client'

import { useEffect, useState } from 'react'

import { isEmpty } from 'lodash'

import { CardTitle, CardDescription, CardHeader, CardContent, Card } from '@/components/ui/card'
import LineChart from '@/components/ui/metrics/line-chart'
import BarChart from '@/components/ui/metrics/bar-chart'
import LabelledpieChart from '@/components/ui/metrics/labelled-pie-chart'

import { humanizeDuration } from '@/utils'

export default function FullMetricsComponent({ content }: { content: any }) {
  const [goupedByStatus, setGoupedByStatus] = useState<any>()

  useEffect(() => {
    if (!isEmpty(content)) {
      setGoupedByStatus(Object.groupBy(content?.cases, ({ status }: { status: string }) => status))
    }
  }, [content])

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
      <Card>
        <CardHeader>
          <CardTitle>Total Tests</CardTitle>
          <CardDescription>
            <span className='text-4xl font-bold'>{content?.cases?.length ?? 0}</span>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <LineChart className='aspect-[4/3]' />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Passing Tests</CardTitle>
          <CardDescription>
            <span className='text-4xl font-bold'>{goupedByStatus?.passed?.length ?? 0}</span>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <BarChart className='aspect-[4/3]' />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Failed Tests</CardTitle>
          <CardDescription>
            <span className='text-4xl font-bold'>{goupedByStatus?.failed?.length ?? 0}</span>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <BarChart className='aspect-[4/3]' />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Test Coverage</CardTitle>
          <CardDescription>
            <span className='text-4xl font-bold'>{`${content?.coverage?.toFixed() ?? 0}%`}</span>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <BarChart className='aspect-[4/3]' />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Avg. Test Duration</CardTitle>
          <CardDescription>
            <span className='text-4xl font-bold'>{humanizeDuration(content?.avg_duration)}</span>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <BarChart className='aspect-[4/3]' />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Flaky Tests</CardTitle>
          <CardDescription>
            <span className='text-4xl font-bold'>{content?.flaky ?? 0}</span>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <LabelledpieChart className='aspect-[4/3]' />
        </CardContent>
      </Card>
    </div>
  )
}
