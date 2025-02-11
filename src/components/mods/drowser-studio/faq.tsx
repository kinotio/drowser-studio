'use client'

import { motion } from 'framer-motion'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion'

const faqs = [
  {
    question: 'What is Drowser Studio?',
    answer:
      'Drowser Studio is a modern analytics platform for your test suite. It provides real-time insights into your test coverage, performance, and reliability, helping you build better software with confidence.'
  },

  {
    question: 'What kind of insights do I get?',
    answer:
      'You get comprehensive insights including test coverage visualization, performance trends, flaky test detection, and historical data analysis. All metrics are available in real-time and can be explored through our interactive dashboard.'
  },
  {
    question: 'Is it suitable for large test suites?',
    answer:
      'Drowser Studio is built to handle large-scale test suites with thousands of tests. Our architecture ensures fast performance even with large amounts of data.'
  }
]

export const FAQ = () => {
  return (
    <section className='py-24'>
      <div className='container px-4 mx-auto'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className='w-full max-w-3xl mx-auto'
        >
          <h2 className='text-3xl md:text-4xl font-bold text-center mb-16 bg-gradient-to-br from-black to-neutral-600 dark:from-white dark:to-neutral-400 bg-clip-text text-transparent'>
            Frequently asked questions
          </h2>
          <Accordion type='single' collapsible className='w-full'>
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className='border-neutral-300 dark:border-neutral-700'
              >
                <AccordionTrigger className='text-left text-black dark:text-white hover:text-black/90 dark:hover:text-white/90'>
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className='text-neutral-600 dark:text-neutral-400'>
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  )
}
