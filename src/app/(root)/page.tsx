import { ChevronRight, Github } from 'lucide-react'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
import FlickeringGrid from '@/components/ui/flickering-grid'
import BlurFade from '@/components/ui/blur-fade'
import AnimatedGradientText from '@/components/ui/animated-gradient-text'

import { FAQ } from '@/components/faq'
import { Plans } from '@/components/plans'
import { Features } from '@/components/features'
import { Code } from '@/components/code'

const Page = () => {
  return (
    <>
      <Hero />
      <Features />
      <Code />
      <Plans />
      <FAQ />
    </>
  )
}

const Hero = () => {
  return (
    <section className='w-full relative h-full'>
      <div className='container relative z-10 grid place-items-center lg:max-w-screen-xl gap-8 mx-auto py-20 md:py-28'>
        <div className='space-y-8'>
          <BlurFade delay={0.1}>
            <AnimatedGradientText className='bg-white dark:bg-slate-950'>
              <Link href='/studio' className='flex items-center justify-center'>
                <span className='backdrop-blur-3xl'>Introducing Drowser Studio</span>
                <ChevronRight className='ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5' />
              </Link>
            </AnimatedGradientText>
          </BlurFade>

          <BlurFade delay={0.1}>
            <div className='mx-auto text-center text-7xl md:text-9xl font-bold'>
              <h1>Explore new way to write tests</h1>
            </div>
          </BlurFade>

          <div className='space-y-4 md:space-y-0 md:space-x-4'>
            <BlurFade delay={0.3}>
              <div className='mt-6 gap-2 flex justify-center'>
                <Link
                  href={'https://docs.kinotio.io/docs/drowser'}
                  target='_blank'
                  className='w-5/6 md:w-1/4'
                >
                  <Button className='w-full h-full font-bold group/arrow'>
                    Documentation
                    <ChevronRight className='size-5 ml-2 group-hover/arrow:translate-x-1 transition-transform' />
                  </Button>
                </Link>

                <Link
                  href={'https://github.com/kinotio/drowser'}
                  target='_blank'
                  className='w-5/6 md:w-1/4'
                >
                  <Button className='w-full h-full font-bold group/arrow' variant='outline'>
                    <Github className='size-5 mr-2' />
                    Github
                    <ChevronRight className='size-5 ml-2 group-hover/arrow:translate-x-1 transition-transform' />
                  </Button>
                </Link>
              </div>
            </BlurFade>
          </div>
        </div>
      </div>

      <FlickeringGrid
        className='z-0 absolute inset-0 size-full'
        squareSize={4}
        gridGap={6}
        color='#6B7280'
        maxOpacity={0.5}
        flickerChance={0.1}
      />
    </section>
  )
}

export default Page
