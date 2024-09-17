import { Sidebar } from '@/components/modules/sidebar'

const ReportLayout = ({
  children
}: Readonly<{
  children: React.ReactNode
}>) => {
  return (
    <div className='flex h-screen'>
      <div className='w-1/4 lg:block'>
        <div className='flex flex-col h-full'>
          <Sidebar />
        </div>
      </div>

      <div className='flex flex-col w-full'>
        <div className='flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6 overflow-auto mb-[120px]'>
          {children}
        </div>
      </div>
    </div>
  )
}

export { ReportLayout }
