import Link from 'next/link'
import Image from 'next/image'

export function FooterComponent() {
  return (
    <footer className='w-full bg-gray-100/40 py-4'>
      <div className='flex items-center justify-end pl-4 gap-2 px-6'>
        <span className='text-sm font-semibold'>By</span>
        <Link href={'https://github.com/kinotio'}>
          <Image src='/images/kinotio-logo-dark.png' alt='Kinotio Logo' width={90} height={90} />
        </Link>
      </div>
    </footer>
  )
}
