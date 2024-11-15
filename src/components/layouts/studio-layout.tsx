'use client'

import { useState, SetStateAction, Dispatch } from 'react'
import { Menu, GithubIcon, Slash } from 'lucide-react'
import Link from 'next/link'
import { UserButton } from '@clerk/nextjs'
import { usePathname } from 'next/navigation'

import { Badge } from '@/components/ui/badge'
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from '@/components/ui/sheet'
import { Separator } from '@/components/ui/separator'
import { Toaster } from '@/components/ui/sonner'
import { DrowserStudio } from '@/components/icons/drowser-studio'
import { Kinotio } from '@/components/icons/kinotio'
import { ToggleTheme } from '@/components/toogle-theme'
import { ImportReport } from '@/components/import-report'
import { Navigation } from '@/components/navigation'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb'
import { Subs } from '@/components/subs'

import { APP_VERSION } from '@/lib/constants'
import { MenuType } from '@/lib/definitions'

const menus = [
  {
    label: 'Reports',
    path: '/studio/reports',
    icon: 'Files'
  },
  {
    label: 'Activities',
    path: '/studio/activities',
    icon: 'Activity'
  },
  {
    label: 'Settings',
    path: '/studio/settings',
    icon: 'Settings'
  }
] as MenuType[]

export const StudioLayout = ({
  children
}: Readonly<{
  children: React.ReactNode
}>) => {
  const pathname = usePathname()
  const pathSegments = pathname.split('/').filter((segment) => segment)

  return (
    <>
      <Header />

      <main className='flex flex-1 flex-col overflow-auto lg:max-w-[60%] m-auto'>
        <div className='flex flex-col'>
          <Breadcrumb className='container w-full m-auto px-4 py-6'>
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

          <div className='overflow-hidden'>{children}</div>
        </div>
      </main>
      <Footer />
      <Toaster position='bottom-center' />
    </>
  )
}

const Header = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className='w-full top-0 mx-auto sticky z-40 p-2 flex justify-center items-center bg-card border-b border-secondary flex-col'>
      <div className='w-[90%] md:w-[70%] lg:w-[75%] lg:max-w-screen-xl flex justify-between items-center'>
        <div className='flex items-center justify-between gap-4'>
          <Link href='/' className='flex items-center gap-4'>
            <DrowserStudio width={200} height={50} />
          </Link>

          <div className='hidden lg:flex'>
            <Navigation menus={menus} />
          </div>
        </div>
        {/* <!-- Mobile --> */}
        <MobileMenu isOpen={isOpen} setIsOpen={setIsOpen} />

        {/* <!-- Desktop --> */}
        <div className='hidden lg:flex justify-center items-center gap-4'>
          <ImportReport>
            <Badge className='h-8 cursor-pointer'>Import Report</Badge>
          </ImportReport>

          <Badge variant='outline' className='h-8 cursor-pointer'>
            <Link href={'https://github.com/kinotio/drowser-studio/issues'} target='_blank'>
              Feedback
            </Link>
          </Badge>

          <ToggleTheme />

          <UserButton />

          <Subs />
        </div>
      </div>
    </header>
  )
}

const Footer = () => {
  return (
    <footer className='flex h-14 lg:h-[60px] items-center border-t fixed bottom-0 w-full bg-white dark:bg-black'>
      <div className='flex flex-1 items-center justify-between px-4 w-full'>
        <div className='flex flex-col'>
          <div className='flex px-6 items-center justify-between gap-4'>
            <Badge>{APP_VERSION}</Badge>
            <Link href={'https://github.com/kinotio/drowser-studio'}>
              <GithubIcon size={20} />
            </Link>
          </div>
        </div>

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

const MobileMenu = ({
  isOpen,
  setIsOpen
}: {
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
}) => {
  return (
    <div className='flex items-center lg:hidden'>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Menu className='cursor-pointer lg:hidden' />
        </SheetTrigger>

        <SheetContent
          side='left'
          className='flex flex-col justify-between bg-card border-secondary'
        >
          <div>
            <SheetHeader className='mb-4 ml-4'>
              <SheetTitle className='flex items-center'>
                <Link href='/' className='flex items-center'>
                  <DrowserStudio width={200} height={50} />
                </Link>
              </SheetTitle>
            </SheetHeader>

            {/* <div className='ml-6'>
              <Navigation menus={menus} />
            </div> */}

            <div className='flex flex-col gap-2'>
              <ImportReport>
                <Badge className='h-8 cursor-pointer'>Import Report</Badge>
              </ImportReport>

              <Badge variant='outline' className='h-8 cursor-pointer'>
                <Link href={'https://github.com/kinotio/drowser-studio/issues'} target='_blank'>
                  Feedback
                </Link>
              </Badge>
            </div>
          </div>

          <SheetFooter className='flex-col sm:flex-col justify-start items-start'>
            <Separator className='mb-2' />
            <div className='flex justify-between w-full items-center'>
              <ToggleTheme />

              <UserButton />
            </div>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  )
}
