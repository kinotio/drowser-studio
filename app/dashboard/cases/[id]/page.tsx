'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'

import { CardTitle, CardDescription, CardHeader, CardContent, Card } from '@/components/ui/card'
import { ResponsiveLine } from '@nivo/line'
import { ResponsiveBar } from '@nivo/bar'
import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table
} from '@/components/ui/table'

import useReportStore from '@/stores/useReportStore'

import { TContentCase, TContentSubCase } from '@/types'

export default function Case() {
  const report = useReportStore((state) => state.content)

  const { id } = useParams()
  const router = useRouter()

  const [content, setContent] = useState<TContentCase>()
  const [goupedByStatus, setGoupedByStatus] = useState<any>()

  useEffect(() => {
    if (report === '') return router.push('/')
    const file = JSON.parse(report)?.drowser.cases.filter((c: any) => c.id === id)[0]
    setGoupedByStatus(Object.groupBy(file.cases, ({ status }: { status: string }) => status))
    setContent(file)
  }, [id, report])

  return (
    <main className='flex flex-col gap-4 p-4 md:gap-8 md:p-6'>
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
              <span className='text-4xl font-bold'>{goupedByStatus?.ok?.length ?? 0}</span>
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
              <span className='text-4xl font-bold'>{goupedByStatus?.ko?.length ?? 0}</span>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <BarChart className='aspect-[4/3]' />
          </CardContent>
        </Card>
      </div>
      <div className='border rounded-lg w-full'>
        <div className='relative w-full overflow-auto'>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Test Name</TableHead>
                <TableHead>Actual</TableHead>
                <TableHead>Exceptation</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Time</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Array.isArray(content?.cases) &&
                content?.cases.map((c: TContentSubCase) => (
                  <TableRow key={c.id}>
                    <TableCell>{c.name}</TableCell>
                    <TableCell>{c.actual}</TableCell>
                    <TableCell>{c.exceptation}</TableCell>
                    <TableCell className={c.status === 'ok' ? 'text-green-500' : 'text-red-500'}>
                      {c.status.toUpperCase()}
                    </TableCell>
                    <TableCell>{c.timestamp}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </main>
  )
}

function BarChart(props: any) {
  return (
    <div {...props}>
      <ResponsiveBar
        data={[
          { name: 'Jan', count: 111 },
          { name: 'Feb', count: 157 },
          { name: 'Mar', count: 129 },
          { name: 'Apr', count: 150 },
          { name: 'May', count: 119 },
          { name: 'Jun', count: 72 }
        ]}
        keys={['count']}
        indexBy='name'
        margin={{ top: 0, right: 0, bottom: 40, left: 40 }}
        padding={0.3}
        colors={['#2563eb']}
        axisBottom={{
          tickSize: 0,
          tickPadding: 16
        }}
        axisLeft={{
          tickSize: 0,
          tickValues: 4,
          tickPadding: 16
        }}
        gridYValues={4}
        theme={{
          tooltip: {
            chip: {
              borderRadius: '9999px'
            },
            container: {
              fontSize: '12px',
              textTransform: 'capitalize',
              borderRadius: '6px'
            }
          },
          grid: {
            line: {
              stroke: '#f3f4f6'
            }
          }
        }}
        tooltipLabel={({ id }) => `${id}`}
        enableLabel={false}
        role='application'
        ariaLabel='A bar chart showing data'
      />
    </div>
  )
}

function LineChart(props: any) {
  return (
    <div {...props}>
      <ResponsiveLine
        data={[
          {
            id: 'Desktop',
            data: [
              { x: 'Jan', y: 43 },
              { x: 'Feb', y: 137 },
              { x: 'Mar', y: 61 },
              { x: 'Apr', y: 145 },
              { x: 'May', y: 26 },
              { x: 'Jun', y: 154 }
            ]
          },
          {
            id: 'Mobile',
            data: [
              { x: 'Jan', y: 60 },
              { x: 'Feb', y: 48 },
              { x: 'Mar', y: 177 },
              { x: 'Apr', y: 78 },
              { x: 'May', y: 96 },
              { x: 'Jun', y: 204 }
            ]
          }
        ]}
        margin={{ top: 10, right: 10, bottom: 40, left: 40 }}
        xScale={{
          type: 'point'
        }}
        yScale={{
          type: 'linear'
        }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 0,
          tickPadding: 16
        }}
        axisLeft={{
          tickSize: 0,
          tickValues: 5,
          tickPadding: 16
        }}
        colors={['#2563eb', '#e11d48']}
        pointSize={6}
        useMesh={true}
        gridYValues={6}
        theme={{
          tooltip: {
            chip: {
              borderRadius: '9999px'
            },
            container: {
              fontSize: '12px',
              textTransform: 'capitalize',
              borderRadius: '6px'
            }
          },
          grid: {
            line: {
              stroke: '#f3f4f6'
            }
          }
        }}
        role='application'
      />
    </div>
  )
}
