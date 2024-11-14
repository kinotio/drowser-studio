'use client'

import { useTheme } from 'next-themes'
import { ResponsiveBar } from '@nivo/bar'

const BarChart = (props: any) => {
  const { theme } = useTheme()
  const color = theme === 'light' ? '#262E3F' : '#f3f4f6'

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

export { BarChart }
