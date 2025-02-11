'use client'

import { motion } from 'framer-motion'
import {
  CodeIcon,
  ChromeIcon as BrowserIcon,
  BoltIcon,
  PuzzleIcon,
  ShieldCheckIcon,
  RocketIcon
} from 'lucide-react'

const bentoItems = [
  {
    title: 'TypeScript Support',
    description: 'Write tests with full TypeScript support for better developer experience.',
    icon: CodeIcon,
    className: 'md:col-span-1 md:row-span-1'
  },
  {
    title: 'Selenium Core',
    description: 'Powered by Selenium for robust and reliable browser automation.',
    icon: BrowserIcon,
    className: 'md:col-span-1 md:row-span-1'
  },
  {
    title: 'Deno Runtime',
    description: 'Leverage the speed and security of Deno for your testing environment.',
    icon: BoltIcon,
    className: 'md:col-span-1 md:row-span-1'
  },
  {
    title: 'Modern APIs',
    description: 'Intuitive and easy-to-use APIs for efficient test writing.',
    icon: PuzzleIcon,
    className: 'md:col-span-1 md:row-span-1'
  },
  {
    title: 'Cross-Browser Testing',
    description: 'Test your applications across multiple browsers with ease.',
    icon: ShieldCheckIcon,
    className: 'md:col-span-2 md:row-span-1'
  },
  {
    title: 'Quick Setup',
    description: 'Get started in minutes with our streamlined setup process.',
    icon: RocketIcon,
    className: 'md:col-span-2 md:row-span-1'
  }
]

export const Bento = () => {
  return (
    <div className='grid grid-cols-1 md:grid-cols-3 gap-4 max-w-6xl mx-auto p-4'>
      {bentoItems.map((item, i) => (
        <motion.div
          key={i}
          className={`${item.className} rounded-xl backdrop-blur-sm border border-neutral-200 dark:border-neutral-800 bg-white/20 dark:bg-black/20 p-4 flex flex-col justify-between`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: i * 0.1 }}
        >
          <div>
            <item.icon className='w-8 h-8 mb-3 text-neutral-700 dark:text-neutral-300' />
            <h3 className='font-semibold text-lg mb-2'>{item.title}</h3>
            <p className='text-sm text-neutral-600 dark:text-neutral-400'>{item.description}</p>
          </div>
        </motion.div>
      ))}
    </div>
  )
}
