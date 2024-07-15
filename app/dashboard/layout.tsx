import type { Metadata } from 'next'

// import HeaderComponent from '@/components/dashboard/header-component'
import { Sidebar } from '@/components/dashboard/sidebar'
import { Footer } from '@/components/dashboard/footer'
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
        {/* <HeaderComponent /> */}
        <main className='flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6 overflow-auto'>
          {children}
        </main>
        <Footer />
        <Toaster position='bottom-left' />
      </div>
    </div>
  )
}

export default Layout
