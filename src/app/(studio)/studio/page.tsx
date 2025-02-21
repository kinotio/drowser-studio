'use client'

import { useEffect, useState, useCallback } from 'react'
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

import { ChartDataItem } from '@/lib/definitions'
import { readableTimestamp } from '@/lib/utils'
import { months, deviceIcons } from '@/lib/constants'

import { getLastThreeReport } from '@/server/actions/report'
import { getLastThreeLogs } from '@/server/actions/log'
import { getCurrentYearMetrics } from '@/server/actions/metric'
import type { ReportSelect, LogSelect } from '@/server/types'

import { useEvents, EventTypes } from '@/hooks/use-events'

import { DATA } from '@/data'

const Page = () => {
  const { userId } = useAuth()
  const { user } = useUser()
  const { events } = useEvents((event) => event.type === EventTypes.REPORT_IMPORTED)

  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [reports, setReports] = useState<ReportSelect[]>([])
  const [metrics, setMetrics] = useState<ChartDataItem[]>()
  const [logs, setLogs] = useState<LogSelect[]>([])

  const currentYear = new Date().getFullYear()

  const getOverviewData = useCallback(() => {
    Promise.all([
      getCurrentYearMetrics({ userId: userId as string, currentYear }),
      getLastThreeReport({ userId: userId as string }),
      getLastThreeLogs({ userId: userId as string })
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
        setReports(reportsData as ReportSelect[])
        setLogs(activitiesData as LogSelect[])
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false))
  }, [userId, currentYear])

  useEffect(() => {
    getOverviewData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId])

  useEffect(() => {
    if (Array.isArray(events) && events.length > 0) {
      for (const event of events) {
        if (event.type === EventTypes.REPORT_IMPORTED) {
          getOverviewData()
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [events])

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
              {Array.isArray(metrics) && metrics.length !== 0 ? (
                <ChartContainer
                  config={{
                    total: {
                      label: 'Reports',
                      color: DATA.color.base
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
              ) : null}
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
                        <CardDescription>
                          {readableTimestamp(report.created.toString())}
                        </CardDescription>
                      </CardHeader>
                    </Card>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Logs</CardTitle>
              <CardDescription>Your last 3 logs</CardDescription>
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
                  {logs.map((log) => (
                    <TableRow key={log.id}>
                      <TableCell>{log.type}</TableCell>
                      <TableCell>{log.description}</TableCell>
                      <TableCell>{readableTimestamp(log.created.toString())}</TableCell>
                      <TableCell>
                        <Icon
                          name={
                            deviceIcons[
                              log.device as keyof typeof deviceIcons
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
