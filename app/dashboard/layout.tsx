import type { Metadata } from 'next'

import { Input } from '@/components/ui/input'
import SidebarComponent from '@/components/dashboard/sidebar-component'

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
        <main className='flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6'>{children}</main>
      </div>
    </div>
  )
}
