'use client'

import { useTheme } from 'next-themes'
import { ResponsiveLine } from '@nivo/line'

interface LineChartData {
  id: string
  data: { x: string | number; y: number }[]
}

export const LineChart = (props: { data: LineChartData[]; className?: string }) => {
  const { theme } = useTheme()
  const color = theme === 'light' ? '#262E3F' : '#2761D7'

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
        colors={[color]}
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
