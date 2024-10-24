'use client'

import { useState, SetStateAction, Dispatch } from 'react'
import { Github, Menu, GithubIcon } from 'lucide-react'
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
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList
} from '@/components/ui/navigation-menu'
import { Button } from '@/components/ui/button'
import { DrowserStudio } from '@/components/icons/drowser-studio'
import { Kinotio } from '@/components/icons/kinotio'

import { ToggleTheme } from '@/components/toogle-theme'

import { APP_VERSION } from '@/lib/constants'

import { DATA } from '@/data'

interface RouteProps {
  href: string
  label: string
}

const routeList: RouteProps[] = [
  {
    href: 'docs',
    label: 'Docs'
  }
]

export const StudioLayout = ({
  children
}: Readonly<{
  children: React.ReactNode
}>) => {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
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
          <NavigationMenu className='hidden lg:block mx-auto'>
            <NavigationMenuList>
              <NavigationMenuItem>
                {routeList.map(({ href, label }) => (
                  <NavigationMenuLink key={href} asChild>
                    <Link href={href} className='text-base px-2'>
                      {label}
                    </Link>
                  </NavigationMenuLink>
                ))}
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          <ToggleTheme />

          <Link
            aria-label='View on GitHub'
            href={DATA.repo}
            target='_blank'
            aria-labelledby='View on GitHub'
          >
            <Github size={20} />
          </Link>

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
    <footer className='flex h-14 lg:h-[60px] items-center border-t fixed bottom-0 w-full'>
      <div className='flex flex-1 items-center justify-between px-4 w-full'>
        <div className='flex flex-col'>
          <div className='flex px-6 items-center justify-between gap-4'>
            <Badge>{APP_VERSION}</Badge>
            <Link href={'https://github.com/kinotio/drowser-studio'}>
              <GithubIcon size={20} />
            </Link>
          </div>
        </div>

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

            <div className='flex flex-col gap-2'>
              {routeList.map(({ href, label }) => (
                <Button
                  key={href}
                  onClick={() => setIsOpen(false)}
                  asChild
                  variant='ghost'
                  className='justify-start text-base'
                >
                  <Link href={href}>{label}</Link>
                </Button>
              ))}
            </div>
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
