import Image from 'next/image'

export function CompanyComponent() {
  return (
    <>
      <section className='w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-r bg-white backdrop-blur-md'>
        <div className='container px-4 md:px-6'>
          <div className='flex flex-col items-center space-y-6 text-center'>
            <div className='space-y-4 text-black'>
              <h1 className='text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl'>
                Trusted by Leading Brands
              </h1>
              <p className='mx-auto max-w-[700px] md:text-xl'>
                Our platform is trusted by some of the biggest names in the industry. See how we ve
                helped them deliver high-quality software and stay ahead of the competition.
              </p>
              <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 sm:gap-6 md:gap-8'>
                <Image
                  alt='Logo'
                  className='aspect-[2/1] overflow-hidden rounded-lg object-contain object-center'
                  height={70}
                  src='/placeholder.svg'
                  width={140}
                />
                <Image
                  alt='Logo'
                  className='aspect-[2/1] overflow-hidden rounded-lg object-contain object-center'
                  height={70}
                  src='/placeholder.svg'
                  width={140}
                />
                <Image
                  alt='Logo'
                  className='aspect-[2/1] overflow-hidden rounded-lg object-contain object-center'
                  height={70}
                  src='/placeholder.svg'
                  width={140}
                />
                <Image
                  alt='Logo'
                  className='aspect-[2/1] overflow-hidden rounded-lg object-contain object-center'
                  height={70}
                  src='/placeholder.svg'
                  width={140}
                />
                <Image
                  alt='Logo'
                  className='aspect-[2/1] overflow-hidden rounded-lg object-contain object-center'
                  height={70}
                  src='/placeholder.svg'
                  width={140}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
