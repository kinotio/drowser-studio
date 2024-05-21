import MetricsComponent from '@/components/dashboard/metrics-component'
import TableComponent from '@/components/dashboard/table-component'

export default function Case() {
  return (
    <main className='flex flex-col gap-4 p-4 md:gap-8 md:p-6'>
      <MetricsComponent />
      <TableComponent />
    </main>
  )
}
