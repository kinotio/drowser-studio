import Link from 'next/link'
import Image from 'next/image'
import { GithubIcon } from 'lucide-react'

const Header = () => {
  return (
    <header className='flex h-20 w-full shrink-0 items-center px-4 md:px-6 bg-white backdrop-blur-md'>
      <Link className='mr-6 lg:flex' href='/'>
        <Image src='/images/drowser-black.png' width={200} height={200} alt='Drowser Studio Logo' />
      </Link>
      <div className='ml-auto gap-3 flex'>
        <Link href={'https://github.com/kinotio/drowser-studio'} className='text-black'>
          <GithubIcon />
        </Link>
      </div>
    </header>
  )
}

export { Header }
