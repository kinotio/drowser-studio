'use client'

import { useState, SetStateAction, Dispatch } from 'react'
import { Github, Menu, icons } from 'lucide-react'
import Link from 'next/link'
import { SignInButton, SignedOut, ClerkLoaded } from '@clerk/nextjs'

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
import { Icon } from '@/components/ui/icon'

import { ToggleTheme } from '@/components/toogle-theme'

import { getCurrentYear } from '@/lib/utils'

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
    <header className='w-full top-0 mx-auto sticky z-40 p-4 flex justify-center items-center bg-card border-b border-secondary'>
      <div className='w-[90%] md:w-[70%] lg:w-[75%] lg:max-w-screen-xl flex justify-between items-center'>
        <Link href='/' className='flex items-center'>
          <Drowser width={100} height={50} />
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
            <SignedOut>
              <SignInButton>
                <Button>Sign In</Button>
              </SignInButton>
            </SignedOut>
          </ClerkLoaded>
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
              <Drowser width={100} height={50} />
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
                <Icon name={contact.icon as keyof typeof icons} size={20} />
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
            <h3 className='font-bold text-lg'>Terms</h3>
            {DATA.footer.terms.map((term, idx) => (
              <Link key={idx} href={term.href} className='opacity-60 hover:opacity-100'>
                {term.name}
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
          <h3>
            Copyright
            {` © ${getCurrentYear()} `}
            <Link
              target='_blank'
              href={DATA.social_url.github}
              className='text-primary transition-all border-primary hover:border-b-2 ml-1'
            >
              Developed by Kinotio.
            </Link>
          </h3>
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
                  <Drowser width={100} height={50} />
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
