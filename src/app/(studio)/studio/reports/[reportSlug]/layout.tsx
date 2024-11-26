import { ReportSidebar } from '@/components/report-sidebar'

const Layout = ({
  children
}: Readonly<{
  children: React.ReactNode
}>) => {
  return (
    <div className='flex flex-col lg:flex-row h-[800px]'>
      <div className='hidden lg:block lg:w-60 xl:w-60'>
        <div className='flex flex-col'>
          <ReportSidebar />
        </div>
      </div>

      <div className='flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6 overflow-auto h-[800px]'>
        {children}
      </div>
    </div>
  )
}

export default Layout
