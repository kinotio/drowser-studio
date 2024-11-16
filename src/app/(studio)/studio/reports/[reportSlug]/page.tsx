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
import { pocketbase } from '@/lib/pocketbase'
import { Report, Metric } from '@/lib/definitions'

const Page = ({ params }: { params: { reportSlug: string } }) => {
  const { userId } = useAuth()
  const [metrics, setMetrics] = useState<Metric>()

  useEffect(() => {
    pocketbase
      .collection('reports')
      .getFirstListItem<Report>('', {
        filter: `user_id = "${userId}" && slug = "${params.reportSlug}"`,
        requestKey: null
      })
      .then((data) => setMetrics(data?.metadata?.drowser?.metrics as Metric))
      .catch((err) => console.log(err))
  }, [userId, params.reportSlug])

  return (
    <div>
      {!isEmpty(metrics) ? (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-6'>
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
                <span className='text-4xl font-bold'>{`${(
                  metrics.test_coverage ?? 0
                ).toFixed()}%`}</span>
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
                  {humanizeDuration(metrics.avg_test_duration ?? 0)}
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
              <LabelledPieChart className='aspect-[4/3]' data={metrics.graphs.flaky_tests} />
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
