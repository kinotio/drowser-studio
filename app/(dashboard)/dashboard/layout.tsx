import type { Metadata } from 'next'

import { Header } from '@/components/modules/dashboard/header'
import { Sidebar } from '@/components/modules/dashboard/sidebar'
import { Footer } from '@/components/modules/dashboard/footer'
import { Toaster } from '@/components/ui/sonner'

export const metadata: Metadata = {
  title: 'Drowser Studio | Dashboard'
}

const Layout = ({
  children
}: Readonly<{
  children: React.ReactNode
}>) => {
  return (
    <div className='flex h-screen'>
      <Sidebar />
      <div className='flex flex-col w-full'>
        <Header />
        <div className='flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6 overflow-auto'>
          {children}
        </div>
        <Footer />
        <Toaster position='bottom-center' />
      </div>
    </div>
  )
}

export default Layout
