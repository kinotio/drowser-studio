'use client'

import { ResponsivePie } from '@nivo/pie'

import { DATA } from '@/data'

interface LabelledPieChartProps {
  data: { id: string; value: number }[]
  className?: string
}

export const LabelledPieChart = (props: LabelledPieChartProps) => {
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
        colors={[DATA.color.base]}
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
