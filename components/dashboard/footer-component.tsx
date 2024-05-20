import Image from 'next/image'

export default function FooterComponent() {
  return (
    <footer className='flex h-14 lg:h-[60px] items-center gap-4 border-b bg-gray-100/40 px-6 dark:bg-gray-800/40'>
      <div className='flex flex-1 items-center justify-end'>
        <div className='flex items-center pl-4 gap-3'>
          <span className='text-sm'>Powered by</span>
          <Image src='/images/kinotio-logo-dark.png' alt='Kinotio Logo' width={90} height={90} />
        </div>
      </div>
    </footer>
  )
}