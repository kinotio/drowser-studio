import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion'

import { DATA } from '@/data'

export const FAQ = () => {
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
