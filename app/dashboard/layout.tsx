import Link from 'next/link'
import { HomeIcon, ClipboardIcon, SettingsIcon, SearchIcon } from 'lucide-react'
import { Input } from '@/components/ui/input'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Drowser | Dashboard'
}

export default function DashboardLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className='grid min-h-screen w-full overflow-hidden lg:grid-cols-[280px_1fr]'>
      <div className='hidden border-r bg-gray-100/40 lg:block dark:bg-gray-800/40'>
        <div className='flex flex-col gap-2'>
          <div className='flex h-[60px] items-center px-6'>
            <Link className='flex items-center gap-2 font-semibold' href='/'>
              <span className='text-black'>Drowser</span>
            </Link>
          </div>
          <div className='flex-1'>
            <nav className='grid items-start px-4 text-sm font-medium'>
              <Link
                className='flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50'
                href='#'
              >
                <HomeIcon className='h-4 w-4' />
                Home
              </Link>
              <Link
                className='flex items-center gap-3 rounded-lg bg-gray-100 px-3 py-2 text-gray-900 transition-all hover:text-gray-900 dark:bg-gray-800 dark:text-gray-50 dark:hover:text-gray-50'
                href='#'
              >
                <ClipboardIcon className='h-4 w-4' />
                Tests
              </Link>
              <Link
                className='flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50'
                href='#'
              >
                <SettingsIcon className='h-4 w-4' />
                Settings
              </Link>
            </nav>
          </div>
        </div>
      </div>
      <div className='flex flex-col'>
        <header className='flex h-14 lg:h-[60px] items-center gap-4 border-b bg-gray-100/40 px-6 dark:bg-gray-800/40'>
          <div className='flex flex-1 items-center gap-4 md:ml-auto md:gap-2 lg:gap-4'>
            <form className='ml-auto flex-1 sm:flex-initial'>
              <div className='relative'>
                <SearchIcon className='absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400' />
                <Input
                  className='pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px] bg-white/80 backdrop-blur-md text-gray-50 hover:bg-gray-900/90 dark:bg-gray-50/80 dark:text-gray-900 dark:hover:bg-gray-50/90'
                  placeholder='Search tests...'
                  type='search'
                />
              </div>
            </form>
          </div>
        </header>
        <main className='flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6'>{children}</main>
      </div>
    </div>
  )
}
