'use client'

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

const data = [
  { name: 'Jan', total: 1200 },
  { name: 'Feb', total: 900 },
  { name: 'Mar', total: 1600 },
  { name: 'Apr', total: 1400 },
  { name: 'May', total: 2000 },
  { name: 'Jun', total: 1800 }
]

const reports = [
  { id: 1, title: 'Q2 Financial Report', date: '2023-06-30' },
  { id: 2, title: 'Marketing Campaign Results', date: '2023-06-15' },
  { id: 3, title: 'Product Launch Analysis', date: '2023-06-01' }
]

const activities = [
  { id: 1, action: 'Updated profile', date: '2023-06-30 14:30' },
  { id: 2, action: 'Submitted expense report', date: '2023-06-29 11:15' },
  { id: 3, action: 'Completed training module', date: '2023-06-28 09:45' }
]

const Page = () => {
  const { userId } = useAuth()
  const { user } = useUser()

  console.log({ userId, user })

  return (
    <div className='container mx-auto p-4 mb-20'>
      <h1 className='text-3xl font-bold mb-6'>Welcome back, {user?.firstName}</h1>
      <div className='flex flex-col space-y-6'>
        {/* Bar Chart */}
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

        {/* Last 3 Reports */}
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
                    <CardTitle className='text-lg'>{report.title}</CardTitle>
                    <CardDescription>{report.date}</CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Last 3 Activities */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
            <CardDescription>Your last 3 activities</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Action</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {activities.map((activity) => (
                  <TableRow key={activity.id}>
                    <TableCell>{activity.action}</TableCell>
                    <TableCell>{activity.date}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Page
