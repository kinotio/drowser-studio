'use client'

import { useEffect, useState } from 'react'
import { useAuth, useUser } from '@clerk/nextjs'
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts'
import Link from 'next/link'
import { icons } from 'lucide-react'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'
import { Skeleton } from '@/components/ui/skeleton'
import { Icon } from '@/components/ui/icon'

import { pocketbase } from '@/lib/pocketbase'
import { Report, Activity, ChartDataItem } from '@/lib/definitions'
import { readableTimestamp } from '@/lib/utils'
import { months, deviceIcons } from '@/lib/constants'

const Page = () => {
  const { userId } = useAuth()
  const { user } = useUser()

  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [reports, setReports] = useState<Report[]>([])
  const [metrics, setMetrics] = useState<ChartDataItem[]>()
  const [activities, setActivities] = useState<Activity[]>([])

  const currentYear = new Date().getFullYear()

  useEffect(() => {
    Promise.all([
      pocketbase.collection('metrics').getFullList({ filter: `year = '${currentYear}'` }),
      pocketbase
        .collection('reports')
        .getList(1, 3, { sort: '-created', filter: `user_id = "${userId}"` }),
      pocketbase
        .collection('activities')
        .getList(1, 3, { sort: '-created', filter: `user_id = "${userId}"` })
    ])
      .then(([metricsData, reportsData, activitiesData]) => {
        const data = months.map((name) => ({
          name,
          total: 0
        }))

        metricsData.forEach((metric) => {
          const monthIndex = metric.month - 1
          if (monthIndex >= 0 && monthIndex < 12) {
            data[monthIndex].total = metric.total
          }
        })

        setMetrics(data as ChartDataItem[])
        setReports(reportsData.items as Report[])
        setActivities(activitiesData.items as Activity[])
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId])

  return (
    <div className='container mx-auto p-4 mb-20'>
      <h1 className='text-3xl font-bold mb-6'>Welcome back, {user?.firstName}</h1>
      {isLoading ? (
        <SkeletonLoader />
      ) : (
        <div className='flex flex-col space-y-6'>
          <Card>
            <CardHeader>
              <CardTitle>Monthly Reports</CardTitle>
              <CardDescription>Reports imported for the past year</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  total: {
                    label: 'Reports',
                    color: '#2761D8'
                  }
                }}
                className='h-[300px] w-full'
              >
                <ResponsiveContainer width='100%' height='100%'>
                  <BarChart data={metrics}>
                    <XAxis dataKey='name' />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey='total' fill='var(--color-total)' />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Reports</CardTitle>
              <CardDescription>Last 3 reports imported</CardDescription>
            </CardHeader>
            <CardContent>
              <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                {reports.map((report) => (
                  <Link key={report.id} href={`/studio/reports/${report.slug}`}>
                    <Card className='flex flex-col justify-between'>
                      <CardHeader>
                        <CardTitle className='text-lg'>{report.name}</CardTitle>
                        <CardDescription>{readableTimestamp(report.created)}</CardDescription>
                      </CardHeader>
                    </Card>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Activities</CardTitle>
              <CardDescription>Your last 3 activities</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Type</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Timestamp</TableHead>
                    <TableHead>Device</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {activities.map((activity) => (
                    <TableRow key={activity.id}>
                      <TableCell>{activity.type}</TableCell>
                      <TableCell>{activity.description}</TableCell>
                      <TableCell>{readableTimestamp(activity.created)}</TableCell>
                      <TableCell>
                        <Icon
                          name={
                            deviceIcons[
                              activity.device as keyof typeof deviceIcons
                            ] as keyof typeof icons
                          }
                          size={20}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}

const SkeletonLoader = () => {
  return (
    <div className='flex flex-col space-y-6'>
      <Skeleton className='h-[400px] w-full rounded-md bg-muted' />
      <Skeleton className='h-[200px] w-full rounded-md bg-muted' />
      <Skeleton className='h-[200px] w-full rounded-md bg-muted' />
    </div>
  )
}

export default Page
