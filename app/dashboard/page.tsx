'use client'

import { useState, useEffect } from 'react'
import { isEmpty } from 'lodash'
import { BarChartBigIcon } from 'lucide-react'

import { useStore } from '@/hooks/use-store'
import { useReportStore } from '@/hooks/use-report-store'

import { TDrowserReport } from '@/lib/definitions'

import { CardTitle, CardDescription, CardHeader, CardContent, Card } from '@/components/ui/card'
import { LineChart } from '@/components/ui/metrics/line-chart'
import { BarChart } from '@/components/ui/metrics/bar-chart'
import { LabelledpieChart } from '@/components/ui/metrics/labelled-pie-chart'

import { humanizeDuration } from '@/lib/utils'

const Page = () => {
  const report = useStore(useReportStore, (state) => state.content) as string

  const [content, setContent] = useState<TDrowserReport>()
  const [metrics, setMetrics] = useState<Record<string, any>>()

  useEffect(() => {
    try {
      setContent(JSON.parse(report))
    } catch (error) {}
  }, [report])

  useEffect(() => {
    if (!isEmpty(content)) setMetrics(content?.drowser?.metrics)
  }, [content])

  return (
    <div>
      {!isEmpty(metrics) ? (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          <Card>
            <CardHeader>
              <CardTitle>Total Tests</CardTitle>
              <CardDescription>
                <span className='text-4xl font-bold'>{metrics.total_tests ?? 0}</span>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <LineChart className='aspect-[4/3]' data={metrics.graphs.total_tests} />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Passing Tests</CardTitle>
              <CardDescription>
                <span className='text-4xl font-bold'>{metrics.passing_tests ?? 0}</span>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <BarChart className='aspect-[4/3]' data={metrics.graphs.passing_tests} />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Failed Tests</CardTitle>
              <CardDescription>
                <span className='text-4xl font-bold'>{metrics.failed_tests ?? 0}</span>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <BarChart className='aspect-[4/3]' data={metrics.graphs.failed_tests} />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Test Coverage</CardTitle>
              <CardDescription>
                <span className='text-4xl font-bold'>{`${metrics.test_coverage.toFixed() ?? 0}%`}</span>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <BarChart className='aspect-[4/3]' data={metrics.graphs.test_coverage} />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Avg. Test Duration</CardTitle>
              <CardDescription>
                <span className='text-4xl font-bold'>
                  {humanizeDuration(metrics.avg_test_duration) ?? 0}
                </span>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <BarChart className='aspect-[4/3]' data={metrics.graphs.avg_test_duration} />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Flaky Tests</CardTitle>
              <CardDescription>
                <span className='text-4xl font-bold'>{metrics.flaky_tests ?? 0}</span>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <LabelledpieChart className='aspect-[4/3]' data={metrics.graphs.flaky_tests} />
            </CardContent>
          </Card>
        </div>
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

export default Page
