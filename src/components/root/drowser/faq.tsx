'use client'

import { motion } from 'framer-motion'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion'

export const FAQ = () => {
  const faq = [
    {
      question: 'What is this package used for?',
      answer:
        "This package allows you to write end-to-end (E2E) tests using Selenium WebDriver in Deno. It's designed to automate browser actions, enabling testing of web applications in different environments."
    },
    {
      question: 'Why use Deno instead of Node.js?',
      answer:
        "Deno offers several advantages over Node.js, such as TypeScript support out of the box, secure by default (no access to files, network, or environment variables unless explicitly enabled), and a modern standard library. It's also designed with ES Modules, making it a good fit for modern JavaScript development."
    },
    {
      question: 'What browsers are supported?',
      answer:
        "The package supports major browsers like Chrome, Firefox, and Edge. Ensure you have the corresponding WebDriver executable installed and available in your system's PATH."
    }
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className='w-full max-w-3xl mx-auto my-16 px-8'
    >
      <h2 className='text-3xl font-bold text-center mb-8'>Frequently Asked Questions</h2>
      <Accordion type='single' collapsible className='w-full'>
        {faq.map((f, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger className='text-left'>{f.question}</AccordionTrigger>
            <AccordionContent>{f.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </motion.div>
  )
}
