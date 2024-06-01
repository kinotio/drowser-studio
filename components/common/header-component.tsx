import Link from 'next/link'
import Image from 'next/image'
import { GithubIcon } from 'lucide-react'

export function HeaderComponent() {
  return (
    <>
      <header className='flex h-20 w-full shrink-0 items-center px-4 md:px-6 bg-gradient-to-r from-[#874CCC]/80 to-[#10439F]/80 backdrop-blur-md'>
        <Link className='mr-6 hidden lg:flex' href='/'>
          <Image
            src='/images/drowser-white.png'
            width={200}
            height={200}
            alt='Drowser Studio Logo'
          />
        </Link>
        <div className='flex items-center border-l-2 pl-4 gap-3'>
          <span>Powered by</span>
          <Image src='/images/kinotio-logo-dark.png' alt='Kinotio Logo' width={120} height={120} />
        </div>
        <div className='ml-auto gap-3 flex'>
          <Link href={'https://github.com/kinotio/drowser-studio'} className='text-gray-50'>
            <GithubIcon />
          </Link>
        </div>
      </header>
    </>
  )
}
