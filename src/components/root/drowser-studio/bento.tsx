'use client'

import { motion } from 'framer-motion'
import { BarChart3, Clock, Zap, Target, AlertTriangle, History } from 'lucide-react'

const features = [
  {
    title: 'Real-time Analytics',
    description:
      'Watch your test metrics update in real-time as your suite runs. Track coverage, duration, and reliability.',
    icon: BarChart3,
    gradient: 'from-blue-500 to-violet-500'
  },
  {
    title: 'Performance Tracking',
    description:
      'Monitor test execution time and identify bottlenecks with detailed performance breakdowns.',
    icon: Clock,
    gradient: 'from-orange-500 to-red-500'
  },
  {
    title: 'Coverage Insights',
    description: 'Visualize your test coverage with intuitive heatmaps and detailed reports.',
    icon: Target,
    gradient: 'from-green-500 to-emerald-500'
  },
  {
    title: 'Flaky Test Detection',
    description: 'Automatically identify inconsistent tests and track reliability over time.',
    icon: AlertTriangle,
    gradient: 'from-yellow-500 to-orange-500'
  },
  {
    title: 'Historical Data',
    description: 'Track trends and patterns with historical test data and custom date ranges.',
    icon: History,
    gradient: 'from-purple-500 to-pink-500'
  },
  {
    title: 'Lightning Fast',
    description: 'Built for speed with instant updates and smooth interactions.',
    icon: Zap,
    gradient: 'from-cyan-500 to-blue-500'
  }
]

export const Bento = () => {
  return (
    <section className='py-24 bg-white dark:bg-black'>
      <div className='container px-4 mx-auto'>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className='text-3xl md:text-4xl font-bold text-center mb-16 bg-gradient-to-br from-black to-neutral-600 dark:from-white dark:to-neutral-400 bg-clip-text text-transparent'
        >
          Everything you need to analyze your tests
        </motion.h2>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto'>
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
              className='group relative rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white/50 dark:bg-neutral-900/50 p-6 hover:bg-neutral-100/50 dark:hover:bg-neutral-800/50 transition-colors'
            >
              <div className='flex flex-col h-full'>
                <div className='flex items-center gap-3 mb-4'>
                  <div className={`p-2 rounded-lg bg-gradient-to-br ${feature.gradient}`}>
                    <feature.icon className='w-5 h-5 text-white' />
                  </div>
                  <h3 className='font-semibold text-lg text-black dark:text-white group-hover:text-black/90 dark:group-hover:text-white/90 transition-colors'>
                    {feature.title}
                  </h3>
                </div>
                <p className='text-sm text-neutral-600 dark:text-neutral-400 group-hover:text-neutral-700 dark:group-hover:text-neutral-300 transition-colors'>
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
