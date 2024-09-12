import Link from 'next/link'

import { KinotioLogo } from '@/components/svg/kinotio-logo'

const Footer = () => {
  return (
    <footer className='flex h-14 lg:h-[60px] items-center gap-4 border-b px-6 border-t'>
      <div className='flex flex-1 items-center justify-end'>
        <div className='flex items-center pl-4 gap-2'>
          <span className='text-sm font-semibold'>By</span>
          <Link href={'https://github.com/kinotio'}>
            <KinotioLogo width={100} height={50} />
          </Link>
        </div>
      </div>
    </footer>
  )
}

export { Footer }
