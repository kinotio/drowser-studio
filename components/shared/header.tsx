'use client'

import Link from 'next/link'
import { GithubIcon } from 'lucide-react'

import { DrowserStudioLogo } from '@/components/logos/drowser-studio-logo'
import { ToggleTheme } from '@/components/shared/toogle-theme'

const Header = () => {
  return (
    <header className='flex h-20 w-full shrink-0 items-center px-4 md:px-6 backdrop-blur-md'>
      <Link className='mr-6 lg:flex' href='/'>
        <DrowserStudioLogo width={200} height={100} />
      </Link>
      <div className='ml-auto gap-3 flex justify-center items-center'>
        <ToggleTheme />

        <Link href={'https://github.com/kinotio/drowser-studio'}>
          <GithubIcon className='size-6' />
        </Link>
      </div>
    </header>
  )
}

export { Header }
