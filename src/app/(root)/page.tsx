'use client'

import { ChevronRight, Github } from 'lucide-react'
import Link from 'next/link'
import { icons, Check } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Icon } from '@/components/ui/icon'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion'
import FlickeringGrid from '@/components/ui/flickering-grid'
import BlurFade from '@/components/ui/blur-fade'
import AnimatedGradientText from '@/components/ui/animated-gradient-text'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'

import { DATA } from '@/data'

const Page = () => {
  return (
    <>
      <Hero />
      <Features />
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
              <Link href='/sign-in' className='flex items-center justify-center'>
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
              {DATA.features.studio.map((feature) => (
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

const Plans = () => {
  return (
    <section className='container mx-auto py-10'>
      <div className='text-center mb-10'>
        <h2 className='text-3xl font-bold mb-2'>Flexible Plans for Every Need</h2>
        <p className='text-xl text-muted-foreground'>
          Choose the perfect plan to power your projects. Scale as you grow.
        </p>
      </div>
      <div className='grid md:grid-cols-3 gap-6'>
        <Card className='w-[450px] h-[500px] flex flex-col m-auto'>
          <CardHeader>
            <CardTitle className='text-2xl'>Free Plan</CardTitle>
            <CardDescription>Perfect for individuals and small teams</CardDescription>
          </CardHeader>
          <CardContent className='flex-grow'>
            <p className='text-4xl font-bold mb-4'>
              $0<span className='text-xl font-normal'>/month</span>
            </p>
            <ul className='space-y-2'>
              <li className='flex items-center'>
                <Check className='mr-2 h-4 w-4 text-green-500' />
                <span>Up to 5 reports</span>
              </li>
              <li className='flex items-center'>
                <Check className='mr-2 h-4 w-4 text-green-500' />
                <span>Basic features</span>
              </li>
              <li className='flex items-center'>
                <Check className='mr-2 h-4 w-4 text-green-500' />
                <span>1GB storage</span>
              </li>
              <li className='flex items-center'>
                <Check className='mr-2 h-4 w-4 text-green-500' />
                <span>Community support</span>
              </li>
            </ul>
          </CardContent>
          <CardFooter className='mt-auto'>
            <Button className='w-full'>Get Started</Button>
          </CardFooter>
        </Card>

        <Card className='w-[450px] h-[500px] flex flex-col m-auto'>
          <CardHeader>
            <CardTitle className='text-2xl'>Pro Plan</CardTitle>
            <CardDescription>Ideal for growing businesses</CardDescription>
          </CardHeader>
          <CardContent className='flex-grow'>
            <p className='text-4xl font-bold mb-4'>
              $10<span className='text-xl font-normal'>/month</span>
            </p>
            <ul className='space-y-2'>
              <li className='flex items-center'>
                <Check className='mr-2 h-4 w-4 text-green-500' />
                <span>Up to 20 reports</span>
              </li>
              <li className='flex items-center'>
                <Check className='mr-2 h-4 w-4 text-green-500' />
                <span>Advanced features</span>
              </li>
              <li className='flex items-center'>
                <Check className='mr-2 h-4 w-4 text-green-500' />
                <span>10GB storage</span>
              </li>
              <li className='flex items-center'>
                <Check className='mr-2 h-4 w-4 text-green-500' />
                <span>Priority email support</span>
              </li>
              <li className='flex items-center'>
                <Check className='mr-2 h-4 w-4 text-green-500' />
                <span>Analytics dashboard</span>
              </li>
            </ul>
          </CardContent>
          <CardFooter className='mt-auto'>
            <Button className='w-full'>Get Started</Button>
          </CardFooter>
        </Card>

        <Card className='w-[450px] h-[500px] flex flex-col m-auto'>
          <CardHeader>
            <CardTitle className='text-2xl'>Enterprise Plan</CardTitle>
            <CardDescription>For large organizations with advanced needs</CardDescription>
          </CardHeader>
          <CardContent className='flex-grow'>
            <p className='text-4xl font-bold mb-4'>
              Custom<span className='text-xl font-normal'> pricing</span>
            </p>
            <ul className='space-y-2'>
              <li className='flex items-center'>
                <Check className='mr-2 h-4 w-4 text-green-500' />
                <span>Unlimited users</span>
              </li>
              <li className='flex items-center'>
                <Check className='mr-2 h-4 w-4 text-green-500' />
                <span>Advanced features</span>
              </li>
              <li className='flex items-center'>
                <Check className='mr-2 h-4 w-4 text-green-500' />
                <span>Unlimited storage</span>
              </li>
              <li className='flex items-center'>
                <Check className='mr-2 h-4 w-4 text-green-500' />
                <span>24/7 Priority support</span>
              </li>
              <li className='flex items-center'>
                <Check className='mr-2 h-4 w-4 text-green-500' />
                <span>Custom integrations</span>
              </li>
              <li className='flex items-center'>
                <Check className='mr-2 h-4 w-4 text-green-500' />
                <span>Dedicated account manager</span>
              </li>
            </ul>
          </CardContent>
          <CardFooter className='mt-auto'>
            <Button className='w-full'>Contact Sales</Button>
          </CardFooter>
        </Card>
      </div>
    </section>
  )
}

const FAQ = () => {
  return (
    <section id='faq' className='container md:w-[700px] py-24 sm:py-32 m-auto'>
      <div className='text-center mb-8'>
        <h2 className='text-lg text-primary text-center mb-2 tracking-wider'>FAQS</h2>
        <h2 className='text-3xl md:text-4xl text-center font-bold'>Common Questions</h2>
      </div>

      <Accordion type='single' collapsible className='AccordionRoot'>
        {DATA.faq.map(({ question, answer }, idx) => (
          <AccordionItem key={idx} value={idx.toString()}>
            <AccordionTrigger className='text-left'>{question}</AccordionTrigger>
            <AccordionContent>{answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  )
}

export default Page
