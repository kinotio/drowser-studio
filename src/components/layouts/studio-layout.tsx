'use client'

import { Slash, PanelLeftOpen, PanelLeftClose } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { Toaster } from '@/components/ui/sonner'
import { Kinotio } from '@/components/icons'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb'
import { Button } from '@/components/ui/button'

import { SidebarProvider, SidebarInset, useSidebar } from '@/components/ui/sidebar'
import { StudioSidebar } from '@/components/studio/studio-sidebar'

export const StudioLayout = ({
  children
}: Readonly<{
  children: React.ReactNode
}>) => {
  const pathname = usePathname()

  return (
    <>
      <SidebarProvider defaultOpen={true}>
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
  const { toggleSidebar, open } = useSidebar()
  const pathSegments = pathname.split('/').filter((segment) => segment)

  return (
    <header className='w-full top-0 mx-auto sticky z-40 flex justify-center items-center bg-card flex-col gap-4'>
      <div className='w-full flex border-b border-secondary'>
        <div className='flex py-2 px-5 justify-between items-center'>
          <Button variant='ghost' size='icon' className='h-8 w-8 p-0' onClick={toggleSidebar}>
            {open ? <PanelLeftClose className='h-4 w-4' /> : <PanelLeftOpen className='h-4 w-4' />}
          </Button>

          <Breadcrumb className='flex justify-between items-center py-3 ml-2'>
            <BreadcrumbList>
              {pathSegments.map((segment, index) => {
                const href = '/' + pathSegments.slice(0, index + 1).join('/')
                return (
                  <div key={href} className='flex items-center gap-2'>
                    <BreadcrumbItem>
                      {index === pathSegments.length - 1 ? (
                        <BreadcrumbPage>{segment.toLowerCase()}</BreadcrumbPage>
                      ) : (
                        <BreadcrumbLink href={href}>{segment.toLowerCase()}</BreadcrumbLink>
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
        <div className='flex items-center pl-4 gap-2'>
          <span className='text-sm font-semibold'>By</span>
          <Link href={'https://github.com/kinotio'}>
            <Kinotio width={100} height={50} />
          </Link>
        </div>
      </div>
    </footer>
  )
}
