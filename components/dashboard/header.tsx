'use client'

import Link from 'next/link'
// import { SearchIcon } from 'lucide-react'

// import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { ToggleTheme } from '@/components/shared/toogle-theme'

const Header = () => {
  return (
    <header className='flex h-14 lg:h-[60px] items-center gap-4 border-b px-6'>
      <div className='flex flex-1 items-center gap-4 md:ml-auto md:gap-2 lg:gap-4'>
        <div className='ml-auto flex items-center gap-4'>
          {/* <form className='flex-1 sm:flex-initial'>
            <div className='relative'>
              <SearchIcon className='absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400' />
              <Input
                className='pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px] bg-white/80 backdrop-blur-md text-gray-50'
                placeholder='Search tests...'
                type='search'
              />
            </div>
          </form> */}

          <Badge className='h-8 cursor-pointer'>
            <Link href={'https://github.com/kinotio/drowser-studio/issues'} target='_blank'>
              Feedback
            </Link>
          </Badge>

          <ToggleTheme />
        </div>
      </div>
    </header>
  )
}

export { Header }
