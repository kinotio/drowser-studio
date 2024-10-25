'use client'

import { useState, SetStateAction, Dispatch } from 'react'
import { Menu, GithubIcon } from 'lucide-react'
import Link from 'next/link'
import { UserButton, ClerkLoaded } from '@clerk/nextjs'

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

import { APP_VERSION } from '@/lib/constants'

export const StudioLayout = ({
  children
}: Readonly<{
  children: React.ReactNode
}>) => {
  return (
    <>
      <Header />
      <main className='flex flex-1 flex-col overflow-auto'>{children}</main>
      <Footer />
      <Toaster position='bottom-center' />
    </>
  )
}

const Header = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className='w-full top-0 mx-auto sticky z-40 p-4 flex justify-center items-center bg-card border-b border-secondary'>
      <div className='w-[90%] md:w-[70%] lg:w-[75%] lg:max-w-screen-xl flex justify-between items-center'>
        <Link href='/' className='flex items-center'>
          <DrowserStudio width={200} height={50} />
        </Link>
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

          <ClerkLoaded>
            <UserButton />
          </ClerkLoaded>
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
          <Link href='/studio/privacy-policy' className='text-sm'>
            Privacy Policy
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
          </div>

          <SheetFooter className='flex-col sm:flex-col justify-start items-start'>
            <Separator className='mb-2' />
            <ToggleTheme />
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  )
}
