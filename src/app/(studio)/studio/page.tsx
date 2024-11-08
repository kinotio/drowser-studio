'use client'

import { useEffect, useState } from 'react'
import { useAuth, useUser } from '@clerk/nextjs'
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts'

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

import { pocketbase } from '@/lib/pocketbase'
import { Report, Activity } from '@/lib/definitions'

const data = [
  { name: 'Jan', total: 1200 },
  { name: 'Feb', total: 900 },
  { name: 'Mar', total: 1600 },
  { name: 'Apr', total: 1400 },
  { name: 'May', total: 2000 },
  { name: 'Jun', total: 1800 }
]

const Page = () => {
  const { userId } = useAuth()
  const { user } = useUser()

  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [reports, setReports] = useState<Report[]>([])
  const [activities, setActivities] = useState<Activity[]>([])

  useEffect(() => {
    Promise.all([
      pocketbase
        .collection('reports')
        .getList(1, 3, { requestKey: null, sort: '-created', filter: `user_id = "${userId}"` }),
      pocketbase
        .collection('activities')
        .getList(1, 3, { requestKey: null, sort: '-created', filter: `user_id = "${userId}"` })
    ])
      .then(([reportsData, activitiesData]) => {
        setReports(reportsData.items as Report[])
        setActivities(activitiesData.items as Activity[])
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false))
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
              <CardDescription>Reports imported for the past 6 months</CardDescription>
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
                  <BarChart data={data}>
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
                  <Card key={report.id} className='flex flex-col justify-between'>
                    <CardHeader>
                      <CardTitle className='text-lg'>{report.name}</CardTitle>
                      <CardDescription>{report.created}</CardDescription>
                    </CardHeader>
                  </Card>
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
                      <TableCell>{activity.device}</TableCell>
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
