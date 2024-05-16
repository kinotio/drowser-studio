import Link from 'next/link'
import { GithubIcon } from 'lucide-react'

import { Badge } from '@/components/ui/badge'

import { APP_VERSION, DASHBOARD_MENU } from '@/constants'

export default function SidebarComponent() {
  return (
    <div className='hidden border-r bg-gray-100/40 lg:block dark:bg-gray-800/40'>
      <div className='flex flex-col gap-2 h-full'>
        <div className='flex h-[60px] items-center px-6'>
          <Link className='flex items-center font-bold' href='/dashboard'>
            <span className='text-black'>Drowser</span>
          </Link>
        </div>

        <div className='flex-1'>
          <nav className='grid items-start px-4 text-sm font-medium'>
            {DASHBOARD_MENU.map((menu) => {
              const Icon = menu.icon
              return (
                <Link
                  key={menu.label}
                  className='flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50'
                  href={menu.url}
                >
                  <Icon className='h-5 w-5' />
                  {menu.label}
                </Link>
              )
            })}
          </nav>
        </div>

        <div className='flex h-[60px] py-6 px-6 items-end justify-between'>
          <Badge>{APP_VERSION}</Badge>
          <Link href={'https://github.com/kinotio/drowser'}>
            <GithubIcon />
          </Link>
        </div>
      </div>
    </div>
  )
}
