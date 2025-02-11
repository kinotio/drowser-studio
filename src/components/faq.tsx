'use client'

import { motion } from 'framer-motion'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion'

import { DATA } from '@/data'

export const FAQ = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className='w-full max-w-3xl mx-auto my-16 px-8'
    >
      <h2 className='text-3xl font-bold text-center mb-8'>Frequently Asked Questions</h2>
      <Accordion type='single' collapsible className='w-full'>
        {DATA.faq.map((f, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger className='text-left'>{f.question}</AccordionTrigger>
            <AccordionContent>{f.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </motion.div>
  )
}
