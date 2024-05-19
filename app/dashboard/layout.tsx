import type { Metadata } from 'next'

// import HeaderComponent from '@/components/dashboard/header-component'
import SidebarComponent from '@/components/dashboard/sidebar-component'
import FooterComponent from '@/components/dashboard/footer-component'

export const metadata: Metadata = {
  title: 'Drowser | Dashboard'
}

export default function DashboardLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className='grid min-h-screen w-full overflow-hidden lg:grid-cols-[280px_1fr]'>
      <SidebarComponent />
      <div className='flex flex-col'>
        {/* <HeaderComponent /> */}
        <main className='flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6'>{children}</main>
        <FooterComponent />
      </div>
    </div>
  )
}
