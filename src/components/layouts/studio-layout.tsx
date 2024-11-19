'use client'

import { useState, SetStateAction, Dispatch, useEffect } from 'react'
import { Menu, GithubIcon, Slash, AlertTriangle } from 'lucide-react'
import Link from 'next/link'
import { UserButton, useAuth } from '@clerk/nextjs'
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
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

import { MenuType } from '@/lib/definitions'
import { pocketbase } from '@/lib/pocketbase'

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
    label: 'Subscription',
    path: '/studio/subscription',
    icon: 'Zap'
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
  const { userId } = useAuth()

  const pathname = usePathname()
  const pathSegments = pathname.split('/').filter((segment) => segment)

  const [isOverLimit, setIsOverLimit] = useState<boolean>(false)

  useEffect(() => {
    pocketbase
      .collection('subscriptions')
      .getFirstListItem('', { filter: `user_id = "${userId}"` })
      .then((sub) => {
        pocketbase
          .collection('reports')
          .getList(1, 1, { filter: `user_id = "${userId}"` })
          .then((reports) => {
            pocketbase
              .collection('plans')
              .getOne(sub.plan_id)
              .then((plan) => {
                console.log(plan.type)
                console.log(reports.totalItems)
                setIsOverLimit(plan.type === 'free' && reports.totalItems >= 5)
              })
          })
      })
      .catch((error) =>
        console.error('An error occurred while verifying over limit reports :', error)
      )
  }, [userId])

  return (
    <>
      <Header pathname={pathname} isOverLimit={isOverLimit} />

      <main className='flex flex-1 flex-col overflow-auto lg:max-w-[60%] m-auto'>
        {isOverLimit ? (
          <Alert variant='destructive' className='my-6 container mx-auto'>
            <AlertTriangle className='h-4 w-4' />
            <AlertTitle>Usage Limit Exceeded</AlertTitle>
            <AlertDescription>
              {`You have exceeded your current plan's usage limit. Please upgrade your plan to
              continue using all features.`}
            </AlertDescription>
          </Alert>
        ) : null}

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

const Header = ({ pathname, isOverLimit }: { pathname: string; isOverLimit: boolean }) => {
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
        <MobileMenu
          pathname={pathname}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          isOverLimit={isOverLimit}
        />

        {/* <!-- Desktop --> */}
        <div className='hidden lg:flex justify-center items-center gap-4'>
          <ImportReport show={!isOverLimit && pathname !== '/subscription'}>
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
  pathname,
  isOpen,
  setIsOpen,
  isOverLimit
}: {
  pathname: string
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
  isOverLimit: boolean
}) => {
  return (
    <div className='flex items-center lg:hidden'>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Menu className='cursor-pointer lg:hidden' />
        </SheetTrigger>

        <SheetContent side='left' className='flex flex-col bg-card border-secondary'>
          <div className='flex flex-col h-full'>
            <SheetHeader className='mb-4 ml-4'>
              <SheetTitle className='flex items-center'>
                <Link href='/' className='flex items-center'>
                  <DrowserStudio width={200} height={50} />
                </Link>
              </SheetTitle>
            </SheetHeader>

            <Navigation isMobile={true} menus={menus} />
          </div>

          <SheetFooter className='flex-col sm:flex-col justify-start items-start gap-4'>
            <div className='flex flex-col gap-4 w-full'>
              <ImportReport show={!isOverLimit && pathname !== '/subscription'}>
                <Button className='h-8 cursor-pointer w-full'>Import Report</Button>
              </ImportReport>

              <Button variant='outline' className='h-8 cursor-pointer w-full'>
                <Link href={'https://github.com/kinotio/drowser-studio/issues'} target='_blank'>
                  Feedback
                </Link>
              </Button>
            </div>
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
