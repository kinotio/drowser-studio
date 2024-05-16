'use client'

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

export default function Case() {
  return (
    <main className='flex flex-col gap-4 p-4 md:gap-8 md:p-6'>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        <Card>
          <CardHeader>
            <CardTitle>Total Tests</CardTitle>
            <CardDescription>
              <span className='text-4xl font-bold'>1,234</span>
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
              <span className='text-4xl font-bold'>987</span>
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
              <span className='text-4xl font-bold'>247</span>
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
                <TableHead>Status</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Assigned To</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Login Test</TableCell>
                <TableCell className='text-green-500'>Passed</TableCell>
                <TableCell>2m 15s</TableCell>
                <TableCell>John Doe</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Signup Test</TableCell>
                <TableCell className='text-red-500'>Failed</TableCell>
                <TableCell>3m 45s</TableCell>
                <TableCell>Jane Smith</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Forgot Password Test</TableCell>
                <TableCell className='text-green-500'>Passed</TableCell>
                <TableCell>1m 30s</TableCell>
                <TableCell>Bob Johnson</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Checkout Test</TableCell>
                <TableCell className='text-yellow-500'>In Progress</TableCell>
                <TableCell>5m 0s</TableCell>
                <TableCell>Sarah Lee</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Search Test</TableCell>
                <TableCell className='text-green-500'>Passed</TableCell>
                <TableCell>2m 45s</TableCell>
                <TableCell>Tom Wilson</TableCell>
              </TableRow>
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
