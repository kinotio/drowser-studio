import { SearchIcon } from 'lucide-react'

import { Input } from '@/components/ui/input'

const Header = () => {
  return (
    <header className='flex h-14 lg:h-[60px] items-center gap-4 border-b bg-gray-100/40 px-6'>
      <div className='flex flex-1 items-center gap-4 md:ml-auto md:gap-2 lg:gap-4'>
        <form className='ml-auto flex-1 sm:flex-initial'>
          <div className='relative'>
            <SearchIcon className='absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400' />
            <Input
              className='pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px] bg-white/80 backdrop-blur-md text-gray-50'
              placeholder='Search tests...'
              type='search'
            />
          </div>
        </form>
      </div>
    </header>
  )
}

export { Header }
