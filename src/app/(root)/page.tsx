'use client'

import { ChevronRight, Github } from 'lucide-react'
import Link from 'next/link'
import { icons } from 'lucide-react'

import { Button } from '@/components/ui/button'
import FlickeringGrid from '@/components/ui/flickering-grid'
import BlurFade from '@/components/ui/blur-fade'
import AnimatedGradientText from '@/components/ui/animated-gradient-text'
import { Icon } from '@/components/ui/icon'

const Home = () => {
  return (
    <>
      <Hero />
      <Features />
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
              <Link href='#studio' className='flex items-center justify-center'>
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

const Features = () => {
  const features: { title: string; description: string; icon: string }[] = [
    {
      title: 'Monitoring',
      description:
        'Easily monitor application performance with real-time insights, powered by Drowser’s automated testing capabilities.',
      icon: 'MonitorCheck'
    },
    {
      title: 'Friendly User Interface',
      description:
        'Access and visualize test reports through a user-friendly interface designed for clarity and ease of use.',
      icon: 'Handshake'
    },
    {
      title: 'Productivity',
      description:
        'Improve your workflow by quickly analyzing test results and making informed decisions with streamlined reporting tools.',
      icon: 'TrendingUp'
    },
    {
      title: 'Graph Visualization',
      description:
        'Easily interpret test results with dynamic graph visualizations, turning complex data into clear, actionable insights.',
      icon: 'Share2'
    }
  ]

  return (
    <section id='studio' className='w-full py-12 md:py-24 lg:py-32 flex justify-center'>
      <div className='container px-4 md:px-6'>
        <div className='gap-6 lg:gap-12'>
          <div className='space-y-4'>
            <div className='space-y-2 flex justify-center flex-col items-center'>
              <h2 className='text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center'>
                Introducing Drowser Studio
              </h2>
              <p className='max-w-[800px] text-center text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed'>
                Our Studio allows you to easily visualize reports, offering clear and interactive
                insights into your data. Simplify complex information with an intuitive interface
                designed for impactful presentations.
              </p>
            </div>
            <div className='grid grid-cols-4 gap-4'>
              {features.map((feature) => (
                <div key={feature.title} className='rounded-lg border bg-background p-4 shadow-sm'>
                  <div className='flex h-12 w-12 items-center justify-center rounded-full bg-primary'>
                    <Icon
                      name={feature.icon as keyof typeof icons}
                      size={20}
                      className='text-primary-foreground'
                    />
                  </div>
                  <h3 className='mt-4 text-lg font-semibold'>{feature.title}</h3>
                  <p className='text-sm text-muted-foreground'>{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Home
