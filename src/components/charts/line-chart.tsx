'use client'

import { ResponsiveLine } from '@nivo/line'

import { DATA } from '@/data'

interface LineChartData {
  id: string
  data: { x: string | number; y: number }[]
}

export const LineChart = (props: { data: LineChartData[]; className?: string }) => {
  return (
    <div {...props}>
      <ResponsiveLine
        data={props.data}
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
        colors={[DATA.color.base]}
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
