'use client'

import { useEffect, useState } from 'react'
import { isEmpty } from 'lodash'
import { BarChartBigIcon } from 'lucide-react'
import { useAuth } from '@clerk/nextjs'

import { CardTitle, CardDescription, CardHeader, CardContent, Card } from '@/components/ui/card'
import { LineChart } from '@/components/charts/line-chart'
import { BarChart } from '@/components/charts/bar-chart'
import { LabelledPieChart } from '@/components/charts/labelled-pie-chart'

import { humanizeDuration } from '@/lib/utils'
import { Metric } from '@/lib/definitions'

import { getReport } from '@/server/actions'
import type { ReportWithTimestamps } from '@/server/types/extended'
import type { ReportModiefied } from '@/server/databases/types'

const Page = ({ params }: { params: { reportSlug: string } }) => {
  const { userId } = useAuth()
  const [metrics, setMetrics] = useState<Metric | undefined>()

  useEffect(() => {
    getReport({ userId: userId as string, reportSlug: params.reportSlug })
      .then((response) => {
        if (response.success && response.data) {
          // Get metrics from the response data
          const report = response.data as ReportWithTimestamps & ReportModiefied
          // Fixed type assertion by ensuring proper type matching
          if (report?.metadata?.drowser?.metrics) {
            setMetrics(report.metadata.drowser.metrics as unknown as Metric)
          }
        } else {
          console.error('Error fetching report:', response.error)
        }
      })
      .catch((err) => console.log(err))
  }, [userId, params.reportSlug])

  return (
    <div className='container mx-auto'>
      {!isEmpty(metrics) ? (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-6'>
          <Card>
            <CardHeader>
              <CardTitle>Total Tests</CardTitle>
              <CardDescription>
                <span className='text-4xl font-bold'>{metrics?.total_tests ?? 0}</span>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <LineChart className='aspect-[4/3]' data={metrics?.graphs?.total_tests} />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Passing Tests</CardTitle>
              <CardDescription>
                <span className='text-4xl font-bold'>{metrics?.passing_tests ?? 0}</span>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <BarChart className='aspect-[4/3]' data={metrics?.graphs?.passing_tests} />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Failed Tests</CardTitle>
              <CardDescription>
                <span className='text-4xl font-bold'>{metrics?.failed_tests ?? 0}</span>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <BarChart className='aspect-[4/3]' data={metrics?.graphs?.failed_tests} />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Test Coverage</CardTitle>
              <CardDescription>
                <span className='text-4xl font-bold'>{`${(
                  metrics?.test_coverage ?? 0
                ).toFixed()}%`}</span>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <BarChart className='aspect-[4/3]' data={metrics?.graphs?.test_coverage} />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Avg. Test Duration</CardTitle>
              <CardDescription>
                <span className='text-4xl font-bold'>
                  {humanizeDuration(metrics?.avg_test_duration ?? 0)}
                </span>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <BarChart className='aspect-[4/3]' data={metrics?.graphs?.avg_test_duration} />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Flaky Tests</CardTitle>
              <CardDescription>
                <span className='text-4xl font-bold'>{metrics?.flaky_tests ?? 0}</span>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <LabelledPieChart className='aspect-[4/3]' data={metrics?.graphs?.flaky_tests} />
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
              or conform json configuration from the <strong>Drowser</strong> package
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

export default Page
