import type { Metadata } from 'next'

// import HeaderComponent from '@/components/dashboard/header-component'
import SidebarComponent from '@/components/dashboard/sidebar-component'
import FooterComponent from '@/components/dashboard/footer-component'

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
      <SidebarComponent />
      <div className='flex flex-col w-full'>
        {/* <HeaderComponent /> */}
        <div className='flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6 overflow-auto'>
          {children}
        </div>
        <FooterComponent />
      </div>
    </div>
  )
}

export default Layout
