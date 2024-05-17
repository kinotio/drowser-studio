'use client'

import { useEffect, useState } from 'react'

import { ResponsiveLine } from '@nivo/line'
import { ResponsiveBar } from '@nivo/bar'
import { ResponsivePie } from '@nivo/pie'

import { isEmpty } from 'lodash'

import { CardTitle, CardDescription, CardHeader, CardContent, Card } from '@/components/ui/card'

export default function MetricsComponent({ content }: { content: any }) {
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
      <Card>
        <CardHeader>
          <CardTitle>Test Coverage</CardTitle>
          <CardDescription>
            <span className='text-4xl font-bold'>85%</span>
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
            <span className='text-4xl font-bold'>2m 30s</span>
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
            <span className='text-4xl font-bold'>15</span>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <LabelledpieChart className='aspect-[4/3]' />
        </CardContent>
      </Card>
    </div>
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

function LabelledpieChart(props: any) {
  return (
    <div {...props}>
      <ResponsivePie
        data={[
          { id: 'Jan', value: 111 },
          { id: 'Feb', value: 157 },
          { id: 'Mar', value: 129 },
          { id: 'Apr', value: 150 },
          { id: 'May', value: 119 },
          { id: 'Jun', value: 72 }
        ]}
        sortByValue
        margin={{ top: 30, right: 50, bottom: 30, left: 50 }}
        innerRadius={0.5}
        padAngle={1}
        cornerRadius={3}
        activeOuterRadiusOffset={2}
        borderWidth={1}
        arcLinkLabelsThickness={1}
        enableArcLabels={false}
        colors={['#2563eb']}
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
          }
        }}
        role='application'
      />
    </div>
  )
}
