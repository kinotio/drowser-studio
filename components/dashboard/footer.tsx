import Image from 'next/image'
import Link from 'next/link'

const Footer = () => {
  return (
    <footer className='flex h-14 lg:h-[60px] items-center gap-4 border-b bg-gray-100/40 px-6 dark:bg-gray-800/40'>
      <div className='flex flex-1 items-center justify-end'>
        <div className='flex items-center pl-4 gap-2'>
          <span className='text-sm font-semibold'>By</span>
          <Link href={'https://github.com/kinotio'}>
            <Image
              src='/images/kinotio-logo-dark.png'
              alt='Kinotio'
              width={90}
              height={90}
              priority
            />
          </Link>
        </div>
      </div>
    </footer>
  )
}

export { Footer }
