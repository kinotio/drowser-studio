'use client'

import { Slash } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { Toaster } from '@/components/ui/sonner'
import { Kinotio } from '@/components/icons/kinotio'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb'
import { SidebarProvider, SidebarInset, SidebarTrigger } from '@/components/ui/sidebar'
import { StudioSidebar } from '@/components/studio-sidebar'

export const StudioLayout = ({
  children
}: Readonly<{
  children: React.ReactNode
}>) => {
  const pathname = usePathname()

  return (
    <>
      <SidebarProvider defaultOpen={false}>
        <StudioSidebar />

        <SidebarInset>
          <Header pathname={pathname} />

          <main className='flex flex-1 flex-col overflow-auto p-2'>
            <div className='overflow-hidden'>{children}</div>
          </main>
        </SidebarInset>
      </SidebarProvider>

      <Footer />
      <Toaster position='bottom-center' />
    </>
  )
}

const Header = ({ pathname }: { pathname: string }) => {
  const pathSegments = pathname.split('/').filter((segment) => segment)

  return (
    <header className='w-full top-0 mx-auto sticky z-40 flex justify-center items-center bg-card flex-col gap-4'>
      <div className='w-full flex border-b border-secondary'>
        <div className='flex py-2 px-5 justify-between items-center'>
          <SidebarTrigger />

          <Breadcrumb className='flex justify-between items-center py-3 ml-2'>
            <BreadcrumbList>
              {pathSegments.map((segment, index) => {
                const href = '/' + pathSegments.slice(0, index + 1).join('/')
                return (
                  <div key={href} className='flex items-center gap-2'>
                    <BreadcrumbItem>
                      {index === pathSegments.length - 1 ? (
                        <BreadcrumbPage>
                          {segment.charAt(0).toUpperCase() + segment.slice(1)}{' '}
                        </BreadcrumbPage>
                      ) : (
                        <BreadcrumbLink href={href}>
                          {segment.charAt(0).toUpperCase() + segment.slice(1)}{' '}
                        </BreadcrumbLink>
                      )}
                    </BreadcrumbItem>
                    {index < pathSegments.length - 1 && (
                      <BreadcrumbSeparator>
                        <Slash />
                      </BreadcrumbSeparator>
                    )}
                  </div>
                )
              })}
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>
    </header>
  )
}

const Footer = () => {
  return (
    <footer className='flex h-14 lg:h-[60px] items-center border-t fixed bottom-0 w-full bg-white dark:bg-black'>
      <div className='flex flex-1 items-end justify-end px-4 w-full'>
        <div className='flex gap-3 items-center'>
          <Link href='/studio/legal/terms' className='text-xs hidden md:block'>
            Terms
          </Link>

          <Link href='/studio/legal/privacy' className='text-xs hidden md:block'>
            Privacy
          </Link>

          <div className='flex items-center pl-4 gap-2'>
            <span className='text-sm font-semibold'>By</span>
            <Link href={'https://github.com/kinotio'}>
              <Kinotio width={100} height={50} />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
