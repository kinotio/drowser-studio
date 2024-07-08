import { CaseMetrics } from '@/components/dashboard/case-metrics'
import { CardList } from '@/components/dashboard/card-list'

const DashboardCase = () => {
  return (
    <div className='flex flex-col gap-4 p-4 md:gap-8 md:p-6'>
      <CaseMetrics />
      <CardList />
    </div>
  )
}

export { DashboardCase }
