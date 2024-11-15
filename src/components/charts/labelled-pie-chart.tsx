'use client'

import { useTheme } from 'next-themes'
import { ResponsivePie } from '@nivo/pie'

interface LabelledPieChartProps {
  data: { id: string; value: number }[]
  className?: string
}

export const LabelledPieChart = (props: LabelledPieChartProps) => {
  const { theme } = useTheme()
  const color = theme === 'light' ? '#262E3F' : '#2761D7'

  return (
    <div {...props}>
      <ResponsivePie
        data={props.data}
        sortByValue
        margin={{ top: 30, right: 50, bottom: 30, left: 50 }}
        innerRadius={0.5}
        padAngle={1}
        cornerRadius={3}
        activeOuterRadiusOffset={2}
        borderWidth={1}
        arcLinkLabelsThickness={1}
        enableArcLabels={false}
        colors={[color]}
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
