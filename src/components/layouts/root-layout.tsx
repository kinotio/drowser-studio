'use client'

import { useState, SetStateAction, Dispatch } from 'react'
import { Github, Menu } from 'lucide-react'
import Link from 'next/link'
import { SignInButton, SignedOut } from '@clerk/nextjs'

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
import { Drowser } from '@/components/icons/drowser'
import { Kinotio } from '@/components/icons/kinotio'
import { Heart } from '@/components/icons/heart'

import { ToggleTheme } from '@/components/toogle-theme'

import { DATA } from '@/data'

export const RootLayout = ({
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
    <header className='w-full top-0 mx-auto sticky z-40 flex justify-center items-center bg-card border-b border-secondary'>
      <div className='w-[90%] md:w-[70%] lg:w-[75%] lg:max-w-screen-xl flex justify-between items-center py-2'>
        <Link href='/' className='flex items-center'>
          <Drowser width={125} height={50} />
        </Link>
        {/* <!-- Mobile --> */}
        <MobileMenu isOpen={isOpen} setIsOpen={setIsOpen} />

        {/* <!-- Desktop --> */}
        <div className='hidden lg:flex justify-center items-center gap-4'>
          <NavigationMenu className='hidden lg:block mx-auto'>
            <NavigationMenuList>
              <NavigationMenuItem>
                {DATA.navbar.map(({ href, name }) => (
                  <NavigationMenuLink key={href} asChild>
                    <Link href={href} className='text-base px-2'>
                      {name}
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

          <SignedOut>
            <SignInButton>
              <Button className='bg-primary hover:bg-orange-600 dark:hover:bg-neutral-200'>
                Get Started
              </Button>
            </SignInButton>
          </SignedOut>
        </div>
      </div>
    </header>
  )
}

const Footer = () => {
  return (
    <footer id='footer' className='bg-card border-t border-secondary w-full flex justify-center'>
      <div className='container py-24 sm:py-32 p-10 w-full place-items-stretch'>
        <div className='grid grid-cols-1 sm:grid-cols-4 md:grid-cols-4 xl:grid-cols-6 gap-x-12 gap-y-8 z-50'>
          <div className='col-span-full xl:col-span-2'>
            <Link href='/' className='flex font-bold items-center'>
              <Kinotio width={125} height={50} />
            </Link>
          </div>

          <div className='flex flex-col gap-2'>
            <h3 className='font-bold text-lg'>Contact</h3>
            {DATA.footer.contact.map((contact, idx) => (
              <Link
                key={idx}
                href={contact.href}
                className='flex gap-2 items-center opacity-60 hover:opacity-100'
              >
                {contact.label}
              </Link>
            ))}
          </div>

          <div className='flex flex-col gap-2'>
            <h3 className='font-bold text-lg'>Help</h3>
            {DATA.footer.help.map((help, idx) => (
              <Link key={idx} href={help.href} className='opacity-60 hover:opacity-100'>
                {help.name}
              </Link>
            ))}
          </div>

          <div className='flex flex-col gap-2'>
            <h3 className='font-bold text-lg'>Legal</h3>
            {DATA.footer.legal.map((l, idx) => (
              <Link key={idx} href={l.href} className='opacity-60 hover:opacity-100'>
                {l.name}
              </Link>
            ))}
          </div>

          <div className='flex flex-col gap-2'>
            <h3 className='font-bold text-lg'>Socials</h3>
            {DATA.footer.socials.map((social, idx) => (
              <Link key={idx} href={social.href} className='opacity-60 hover:opacity-100'>
                {social.label}
              </Link>
            ))}
          </div>
        </div>

        <section className='my-6'>
          <div className='flex items-center space-x-3 text-gray-400'>
            <div className='h-6 w-6 opacity-50'>
              <Heart />
            </div>
            <p className='text-sm'>crafted with care and dedication.</p>
          </div>
        </section>
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
                  <Drowser width={125} height={50} />
                </Link>
              </SheetTitle>
            </SheetHeader>

            <div className='flex flex-col gap-2'>
              {DATA.navbar.map(({ href, name }) => (
                <Button
                  key={href}
                  onClick={() => setIsOpen(false)}
                  asChild
                  variant='ghost'
                  className='justify-start text-base'
                >
                  <Link href={href}>{name}</Link>
                </Button>
              ))}
            </div>
          </div>

          <SheetFooter className='flex-col sm:flex-col justify-start items-start w-full gap-4'>
            <SignedOut>
              <SignInButton>
                <Button className='w-full'>Sign In</Button>
              </SignInButton>
            </SignedOut>
            <Separator className='mb-2' />
            <ToggleTheme />
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  )
}
