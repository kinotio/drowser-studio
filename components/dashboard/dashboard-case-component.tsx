import MetricsComponent from '@/components/dashboard/metrics-component'
import CardListComponent from '@/components/dashboard/card-list-component'

export default function DashboardCaseComponent() {
  return (
    <div className='flex flex-col gap-4 p-4 md:gap-8 md:p-6'>
      <MetricsComponent />
      <CardListComponent />
    </div>
  )
}
