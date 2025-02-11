'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Github, Book } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { FlipWords } from '@/components/ui/flip-words'
import { CodeBlock } from '@/components/ui/code-block'

export const Hero = () => {
  const words = ['Selenium', 'Browser', 'End2End', 'User Interface']

  const code = `
  import { driver } from "https://deno.land/x/drowser@${'v0.1.5'}/mod.ts";
      
  driver({ browser: "chrome" })
    .then(({ service }) => {
      service.cases = [
        {
          name: "Verify Title",
          fn: async ({ builder, assert }) => {
            const title = await builder.getTitle();
            assert.assertEquals(title, "Drowser");
          },
        },
      ];
    }).catch((error) => console.log(error));`

  return (
    <section className='relative min-h-screen flex flex-col items-center justify-center overflow-hidden'>
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
          transition={{ duration: 0.5 }}
          className='mx-auto mb-8 flex justify-center'
        >
          <div className='rounded-full bg-neutral-100 dark:bg-neutral-900 px-4 py-1.5 text-sm font-medium flex items-center gap-2'>
            Introducing Drowser Studio <ArrowRight className='w-4 h-4' />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className='text-center'
        >
          <h1 className='mx-auto max-w-5xl text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-8'>
            Explore new way to write{' '}
            <span className='inline-block'>
              <FlipWords words={words} duration={2000} className='text-primary' />
            </span>{' '}
            tests
          </h1>

          <p className='mx-auto max-w-2xl text-neutral-600 dark:text-neutral-400 text-lg md:text-xl mb-8'>
            Write powerful Selenium tests with the simplicity of Deno and TypeScript.
          </p>

          <div className='flex gap-4 justify-center mb-8'>
            <Button
              size='lg'
              className='bg-primary hover:bg-neutral-800 dark:hover:bg-neutral-200'
              asChild
            >
              <Link href='/docs'>
                <Book className='w-5 h-5' />
                Documentation
              </Link>
            </Button>
            <Button size='lg' variant='outline' className='border-2 gap-2' asChild>
              <Link href='https://github.com'>
                <Github className='w-5 h-5' />
                GitHub
              </Link>
            </Button>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className='flex flex-wrap justify-center gap-4 mb-12'
          >
            {['TypeScript Support', 'Selenium Core', 'Deno Runtime', 'Modern APIs'].map(
              (feature) => (
                <div
                  key={feature}
                  className='px-4 py-1.5 rounded-full bg-neutral-100 dark:bg-neutral-900 text-sm font-medium'
                >
                  {feature}
                </div>
              )
            )}
          </motion.div>

          <CodeBlock language='ts' filename='test.ts' code={code} />
        </motion.div>
      </div>
    </section>
  )
}
