'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

import { FlipWords } from '@/components/ui/flip-words'
import { Button } from '@/components/ui/button'

export const Hero = () => {
  const words = ['visualize', 'analyze', 'track', 'improve']

  return (
    <section className='relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-20'>
      <div
        className='absolute inset-0 w-full h-full dark:opacity-20 opacity-60'
        style={{
          backgroundImage: `radial-gradient(circle at center, #e5e7eb 2px, transparent 2px)`,
          backgroundSize: '24px 24px'
        }}
      />

      <div className='relative z-10 container px-4 mx-auto'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className='text-center mb-16 max-w-4xl mx-auto'
        >
          <h1 className='text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-8 bg-gradient-to-br from-black to-neutral-600 dark:from-white dark:to-neutral-400 bg-clip-text text-transparent'>
            The analytics platform for{' '}
            <span className='inline-block'>
              <FlipWords
                words={words}
                duration={2000}
                className='text-primary !dark:text-primary'
              />
            </span>{' '}
            your tests
          </h1>

          <p className='text-neutral-600 dark:text-neutral-400 text-lg md:text-xl mb-8 leading-relaxed'>
            Beautiful analytics for your test suite. Get insights into coverage, performance, and
            reliability. Built for modern testing workflows.
          </p>

          <div className='flex gap-4 justify-center mb-16'>
            <Button
              size='lg'
              className='bg-primary hover:bg-neutral-800 dark:hover:bg-neutral-200 px-8'
              asChild
            >
              <Link href='/studio'>Get Started</Link>
            </Button>
          </div>
        </motion.div>

        {/* Dashboard Preview */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className='relative mx-auto max-w-6xl'
        >
          <div className='absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent dark:from-black dark:via-transparent dark:to-transparent z-10' />
          <div className='rounded-xl overflow-hidden border border-neutral-200 dark:border-neutral-800 shadow-2xl'>
            <Image
              src='/images/drowser-studio.png'
              alt='Drowser Studio Dashboard'
              width={1200}
              height={675}
              className='w-full'
            />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
