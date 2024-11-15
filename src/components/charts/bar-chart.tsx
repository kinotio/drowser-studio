'use client'

import { useTheme } from 'next-themes'
import { ResponsiveBar } from '@nivo/bar'

export const BarChart = (props: {
  data: { name: string; count: number }[]
  className?: string
}) => {
  const { theme } = useTheme()
  const color = theme === 'light' ? '#262E3F' : '#2761D7'

  return (
    <div {...props}>
      <ResponsiveBar
        data={props.data}
        keys={['count']}
        indexBy='name'
        margin={{ top: 0, right: 0, bottom: 40, left: 40 }}
        padding={0.3}
        colors={[color]}
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
