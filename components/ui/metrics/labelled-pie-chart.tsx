import { ResponsivePie } from '@nivo/pie'

export default function LabelledpieChart(props: any) {
  return (
    <div {...props}>
      <ResponsivePie
        data={[
          { id: 'Jan', value: 111 },
          { id: 'Feb', value: 157 },
          { id: 'Mar', value: 129 },
          { id: 'Apr', value: 150 },
          { id: 'May', value: 119 },
          { id: 'Jun', value: 72 },
          { id: 'Jul', value: 111 },
          { id: 'Aug', value: 157 },
          { id: 'Sep', value: 129 },
          { id: 'Oct', value: 150 },
          { id: 'Nov', value: 119 },
          { id: 'Dec', value: 72 }
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
        colors={['#4669B3']}
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
